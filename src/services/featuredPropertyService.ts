
import { db } from '@/lib/firebase';
import { collection, doc, addDoc, getDocs, query, orderBy, updateDoc, where } from 'firebase/firestore';

export interface FeaturedRequest {
  id?: string;
  propertyId: string;
  agentId: string;
  propertyTitle: string;
  requestDate: string;
  status: 'pending' | 'approved' | 'rejected';
  adminNotes?: string;
  paymentId?: string;
  paymentStatus?: 'pending' | 'success' | 'failed';
}

const FEATURED_REQUESTS_COLLECTION = 'featuredRequests';

export const requestFeaturedProperty = async (
  propertyId: string, 
  agentId: string, 
  propertyTitle: string,
  paymentId?: string
) => {
  try {
    const requestData: Omit<FeaturedRequest, 'id'> = {
      propertyId,
      agentId,
      propertyTitle,
      requestDate: new Date().toISOString(),
      status: 'pending',
      ...(paymentId && { 
        paymentId,
        paymentStatus: 'success'
      })
    };
    
    const docRef = await addDoc(collection(db, FEATURED_REQUESTS_COLLECTION), requestData);
    return docRef.id;
  } catch (error) {
    console.error('Error requesting featured property:', error);
    throw error;
  }
};

export const getFeaturedRequests = async () => {
  try {
    const q = query(collection(db, FEATURED_REQUESTS_COLLECTION), orderBy('requestDate', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const requests: FeaturedRequest[] = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as FeaturedRequest));
    
    return requests;
  } catch (error) {
    console.error('Error getting featured requests:', error);
    throw error;
  }
};

export const updateFeaturedRequestStatus = async (
  requestId: string, 
  status: 'approved' | 'rejected', 
  adminNotes?: string
) => {
  try {
    const requestRef = doc(db, FEATURED_REQUESTS_COLLECTION, requestId);
    await updateDoc(requestRef, { 
      status, 
      adminNotes: adminNotes || '',
      updatedDate: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error updating featured request:', error);
    throw error;
  }
};

export const getFeaturedRequestStatus = async (propertyId: string, agentId: string) => {
  try {
    const q = query(
      collection(db, FEATURED_REQUESTS_COLLECTION), 
      where('propertyId', '==', propertyId),
      where('agentId', '==', agentId),
      orderBy('requestDate', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const latestRequest = querySnapshot.docs[0].data() as FeaturedRequest;
      return latestRequest.status;
    }
    
    return 'none' as const;
  } catch (error) {
    console.error('Error getting featured request status:', error);
    return 'none' as const;
  }
};
