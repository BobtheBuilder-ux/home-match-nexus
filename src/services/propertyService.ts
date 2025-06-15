
import { db } from '@/lib/firebase';
import { collection, doc, addDoc, getDocs, query, where, orderBy, updateDoc, deleteDoc } from 'firebase/firestore';
import { Property } from '@/types/property';

const PROPERTIES_COLLECTION = 'properties';

export const addProperty = async (propertyData: Omit<Property, 'id'>) => {
  try {
    const docRef = await addDoc(collection(db, PROPERTIES_COLLECTION), propertyData);
    return docRef.id;
  } catch (error) {
    console.error('Error adding property:', error);
    throw error;
  }
};

export const getProperties = async (filters?: { city?: string; maxPrice?: number; minBedrooms?: number }) => {
  try {
    let q = query(collection(db, PROPERTIES_COLLECTION), orderBy('dateAdded', 'desc'));
    
    if (filters?.city) {
      q = query(collection(db, PROPERTIES_COLLECTION), where('city', '==', filters.city), orderBy('dateAdded', 'desc'));
    }
    
    const querySnapshot = await getDocs(q);
    const properties: Property[] = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Property));
    
    return properties;
  } catch (error) {
    console.error('Error getting properties:', error);
    throw error;
  }
};

export const getPropertiesByAgent = async (agentId: string) => {
  try {
    const q = query(
      collection(db, PROPERTIES_COLLECTION), 
      where('agentId', '==', agentId),
      orderBy('dateAdded', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const properties: Property[] = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Property));
    
    return properties;
  } catch (error) {
    console.error('Error getting agent properties:', error);
    throw error;
  }
};

export const updateProperty = async (propertyId: string, updates: Partial<Property>) => {
  try {
    const propertyRef = doc(db, PROPERTIES_COLLECTION, propertyId);
    await updateDoc(propertyRef, { ...updates, dateUpdated: new Date().toISOString() });
  } catch (error) {
    console.error('Error updating property:', error);
    throw error;
  }
};

export const deleteProperty = async (propertyId: string) => {
  try {
    const propertyRef = doc(db, PROPERTIES_COLLECTION, propertyId);
    await deleteDoc(propertyRef);
  } catch (error) {
    console.error('Error deleting property:', error);
    throw error;
  }
};
