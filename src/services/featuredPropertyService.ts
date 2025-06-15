
import { databases, DATABASE_ID, FEATURED_REQUESTS_COLLECTION_ID } from '@/lib/appwrite';
import { ID, Query } from 'appwrite';

export interface FeaturedRequest {
  id?: string;
  propertyId: string;
  agentId: string;
  propertyTitle: string;
  requestDate: string;
  status: 'pending' | 'approved' | 'rejected';
  adminNotes?: string;
}

export const requestFeaturedProperty = async (propertyId: string, agentId: string, propertyTitle: string) => {
  try {
    const requestData: Omit<FeaturedRequest, 'id'> = {
      propertyId,
      agentId,
      propertyTitle,
      requestDate: new Date().toISOString(),
      status: 'pending'
    };
    
    const response = await databases.createDocument(
      DATABASE_ID,
      FEATURED_REQUESTS_COLLECTION_ID,
      ID.unique(),
      requestData
    );
    return response.$id;
  } catch (error) {
    console.error('Error requesting featured property:', error);
    throw error;
  }
};

export const getFeaturedRequests = async () => {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      FEATURED_REQUESTS_COLLECTION_ID,
      [Query.orderDesc('requestDate')]
    );
    
    const requests: FeaturedRequest[] = response.documents.map(doc => ({
      id: doc.$id,
      ...doc
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
    await databases.updateDocument(
      DATABASE_ID,
      FEATURED_REQUESTS_COLLECTION_ID,
      requestId,
      { 
        status, 
        adminNotes: adminNotes || '',
        updatedDate: new Date().toISOString()
      }
    );
  } catch (error) {
    console.error('Error updating featured request:', error);
    throw error;
  }
};
