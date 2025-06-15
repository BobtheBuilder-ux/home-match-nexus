
import { supabase } from '@/integrations/supabase/client';

export interface PaymentRecord {
  id?: string;
  property_id: string;
  agent_id: string;
  property_title: string;
  amount: number;
  currency: string;
  status: 'pending' | 'success' | 'failed';
  paystack_reference: string;
  transaction_date: string;
  webhook_verified?: boolean;
  created_at?: string;
}

export const initializePaystackPayment = (
  email: string,
  amount: number,
  reference: string,
  metadata: any
) => {
  return new Promise((resolve, reject) => {
    const handler = (window as any).PaystackPop.setup({
      key: 'pk_test_3a33a1ac61644c0a206ea31d30932396c5fe1fd3',
      email: email,
      amount: amount * 100,
      currency: 'NGN',
      ref: reference,
      metadata: metadata,
      callback: function(response: any) {
        console.log('Payment completed, awaiting webhook verification:', response);
        resolve(response);
      },
      onClose: function() {
        reject(new Error('Payment cancelled'));
      }
    });
    handler.openIframe();
  });
};

export const createPaymentRecord = async (paymentData: Omit<PaymentRecord, 'id' | 'created_at'>) => {
  try {
    const { data, error } = await supabase
      .from('payments')
      .insert([{
        ...paymentData,
        webhook_verified: false
      }])
      .select()
      .single();

    if (error) throw error;
    return data.id;
  } catch (error) {
    console.error('Error creating payment record:', error);
    throw error;
  }
};

export const updatePaymentStatus = async (
  paymentId: string, 
  status: 'success' | 'failed',
  paystackReference?: string,
  webhookVerified: boolean = false
) => {
  try {
    const updateData: any = { 
      status,
      webhook_verified: webhookVerified
    };
    
    if (paystackReference) {
      updateData.paystack_reference = paystackReference;
    }

    const { error } = await supabase
      .from('payments')
      .update(updateData)
      .eq('id', paymentId);

    if (error) throw error;
  } catch (error) {
    console.error('Error updating payment status:', error);
    throw error;
  }
};

export const verifyPaymentWithWebhook = async (reference: string): Promise<boolean> => {
  try {
    const maxAttempts = 30;
    let attempts = 0;
    
    while (attempts < maxAttempts) {
      const { data, error } = await supabase
        .from('payments')
        .select('*')
        .eq('paystack_reference', reference)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error checking payment:', error);
        return false;
      }

      if (data) {
        if (data.webhook_verified && data.status === 'success') {
          return true;
        }
        
        if (data.status === 'failed') {
          return false;
        }
      }
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      attempts++;
    }
    
    console.warn('Webhook verification timeout for reference:', reference);
    return false;
  } catch (error) {
    console.error('Error verifying payment with webhook:', error);
    return false;
  }
};

export const getPaymentsByAgent = async (agentId: string) => {
  try {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('agent_id', agentId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as PaymentRecord[];
  } catch (error) {
    console.error('Error getting payments:', error);
    throw error;
  }
};

export const generatePaymentReference = () => {
  return `hm_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};
