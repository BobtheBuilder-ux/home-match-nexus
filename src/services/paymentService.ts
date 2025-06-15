
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
      key: 'pk_test_your_paystack_public_key', // Replace with your Paystack public key
      email: email,
      amount: amount * 100, // Paystack expects amount in kobo
      currency: 'NGN',
      ref: reference,
      metadata: metadata,
      callback: function(response: any) {
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
    const docRef = await addDoc(collection(db, PAYMENTS_COLLECTION), paymentData);
    return docRef.id;
  } catch (error) {
    console.error('Error creating payment record:', error);
    throw error;
  }
};

export const updatePaymentStatus = async (
  paymentId: string, 
  status: 'success' | 'failed',
  paystackReference?: string
) => {
  try {
    const paymentRef = doc(db, PAYMENTS_COLLECTION, paymentId);
    await updateDoc(paymentRef, { 
      status,
      ...(paystackReference && { paystackReference })
    });
  } catch (error) {
    console.error('Error updating payment status:', error);
    throw error;
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
