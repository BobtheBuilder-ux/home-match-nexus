import { db } from '@/lib/firebase';
import { collection, doc, addDoc, updateDoc, getDocs, query, where } from 'firebase/firestore';

export interface PaymentRecord {
  id?: string;
  propertyId: string;
  agentId: string;
  propertyTitle: string;
  amount: number;
  currency: string;
  status: 'pending' | 'success' | 'failed';
  paystackReference: string;
  transactionDate: string;
  featuredRequestId?: string;
  verifiedAt?: string;
  webhookVerified?: boolean;
}

const PAYMENTS_COLLECTION = 'payments';

export const initializePaystackPayment = (
  email: string,
  amount: number,
  reference: string,
  metadata: any
) => {
  return new Promise((resolve, reject) => {
    const handler = (window as any).PaystackPop.setup({
      key: 'pk_test_3a33a1ac61644c0a206ea31d30932396c5fe1fd3', // Your actual Paystack public key
      email: email,
      amount: amount * 100, // Paystack expects amount in kobo
      currency: 'NGN',
      ref: reference,
      metadata: metadata,
      callback: function(response: any) {
        // Payment completed - but we'll wait for webhook verification
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

export const createPaymentRecord = async (paymentData: Omit<PaymentRecord, 'id'>) => {
  try {
    const docRef = await addDoc(collection(db, PAYMENTS_COLLECTION), {
      ...paymentData,
      webhookVerified: false
    });
    return docRef.id;
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
    const paymentRef = doc(db, PAYMENTS_COLLECTION, paymentId);
    const updateData: any = { 
      status,
      webhookVerified,
      ...(paystackReference && { paystackReference })
    };
    
    if (webhookVerified && status === 'success') {
      updateData.verifiedAt = new Date().toISOString();
    }
    
    await updateDoc(paymentRef, updateData);
  } catch (error) {
    console.error('Error updating payment status:', error);
    throw error;
  }
};

export const verifyPaymentWithWebhook = async (reference: string): Promise<boolean> => {
  try {
    // Poll for webhook verification (max 30 seconds)
    const maxAttempts = 30;
    let attempts = 0;
    
    while (attempts < maxAttempts) {
      const q = query(collection(db, PAYMENTS_COLLECTION), where('paystackReference', '==', reference));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const paymentDoc = querySnapshot.docs[0];
        const paymentData = paymentDoc.data() as PaymentRecord;
        
        if (paymentData.webhookVerified && paymentData.status === 'success') {
          return true;
        }
        
        if (paymentData.status === 'failed') {
          return false;
        }
      }
      
      // Wait 1 second before next check
      await new Promise(resolve => setTimeout(resolve, 1000));
      attempts++;
    }
    
    // Timeout - webhook not received
    console.warn('Webhook verification timeout for reference:', reference);
    return false;
  } catch (error) {
    console.error('Error verifying payment with webhook:', error);
    return false;
  }
};

export const getPaymentsByAgent = async (agentId: string) => {
  try {
    const q = query(collection(db, PAYMENTS_COLLECTION), where('agentId', '==', agentId));
    const querySnapshot = await getDocs(q);
    
    const payments: PaymentRecord[] = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as PaymentRecord));
    
    return payments;
  } catch (error) {
    console.error('Error getting payments:', error);
    throw error;
  }
};

export const generatePaymentReference = () => {
  return `hm_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};
