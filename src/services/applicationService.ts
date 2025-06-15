
import { databases, DATABASE_ID, APPLICATIONS_COLLECTION_ID } from '@/lib/appwrite';
import { ID, Query } from 'appwrite';
import { TenantApplication } from '@/types/application';

export const submitApplication = async (applicationData: Omit<TenantApplication, 'id'>) => {
  try {
    const response = await databases.createDocument(
      DATABASE_ID,
      APPLICATIONS_COLLECTION_ID,
      ID.unique(),
      applicationData
    );
    return response.$id;
  } catch (error) {
    console.error('Error submitting application:', error);
    throw error;
  }
};

export const getApplicationsByProperty = async (propertyId: string) => {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      APPLICATIONS_COLLECTION_ID,
      [
        Query.equal('propertyId', propertyId),
        Query.orderDesc('submittedAt')
      ]
    );
    
    const applications: TenantApplication[] = response.documents.map(doc => {
      const { $id, $collectionId, $databaseId, $createdAt, $updatedAt, $permissions, ...data } = doc;
      return {
        id: $id,
        ...data
      } as TenantApplication;
    });
    
    return applications;
  } catch (error) {
    console.error('Error getting applications:', error);
    throw error;
  }
};

export const getApplicationsByApplicant = async (applicantId: string) => {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      APPLICATIONS_COLLECTION_ID,
      [
        Query.equal('applicantId', applicantId),
        Query.orderDesc('submittedAt')
      ]
    );
    
    const applications: TenantApplication[] = response.documents.map(doc => {
      const { $id, $collectionId, $databaseId, $createdAt, $updatedAt, $permissions, ...data } = doc;
      return {
        id: $id,
        ...data
      } as TenantApplication;
    });
    
    return applications;
  } catch (error) {
    console.error('Error getting user applications:', error);
    throw error;
  }
};

export const updateApplicationStatus = async (
  applicationId: string, 
  status: TenantApplication['status']
) => {
  try {
    await databases.updateDocument(
      DATABASE_ID,
      APPLICATIONS_COLLECTION_ID,
      applicationId,
      { 
        status, 
        reviewedAt: new Date().toISOString() 
      }
    );
  } catch (error) {
    console.error('Error updating application status:', error);
    throw error;
  }
};
