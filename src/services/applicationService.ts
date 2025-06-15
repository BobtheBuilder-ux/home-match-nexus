
import { db } from '@/lib/firebase';
import { collection, doc, addDoc, getDocs, query, where, orderBy, updateDoc } from 'firebase/firestore';
import { TenantApplication } from '@/types/application';

const APPLICATIONS_COLLECTION = 'applications';

export const submitApplication = async (applicationData: Omit<TenantApplication, 'id'>) => {
  try {
    const docRef = await addDoc(collection(db, APPLICATIONS_COLLECTION), applicationData);
    return docRef.id;
  } catch (error) {
    console.error('Error submitting application:', error);
    throw error;
  }
};

export const getApplicationsByProperty = async (propertyId: string) => {
  try {
    const q = query(
      collection(db, APPLICATIONS_COLLECTION),
      where('propertyId', '==', propertyId),
      orderBy('submittedAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const applications: TenantApplication[] = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as TenantApplication));
    
    return applications;
  } catch (error) {
    console.error('Error getting applications:', error);
    throw error;
  }
};

export const getApplicationsByApplicant = async (applicantId: string) => {
  try {
    const q = query(
      collection(db, APPLICATIONS_COLLECTION),
      where('applicantId', '==', applicantId),
      orderBy('submittedAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const applications: TenantApplication[] = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as TenantApplication));
    
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
    const applicationRef = doc(db, APPLICATIONS_COLLECTION, applicationId);
    await updateDoc(applicationRef, { 
      status, 
      reviewedAt: new Date().toISOString() 
    });
  } catch (error) {
    console.error('Error updating application status:', error);
    throw error;
  }
};
