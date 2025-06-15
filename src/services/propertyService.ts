
import { databases, DATABASE_ID, PROPERTIES_COLLECTION_ID } from '@/lib/appwrite';
import { ID, Query } from 'appwrite';
import { Property } from '@/types/property';

export const addProperty = async (propertyData: Omit<Property, 'id'>) => {
  try {
    const response = await databases.createDocument(
      DATABASE_ID,
      PROPERTIES_COLLECTION_ID,
      ID.unique(),
      propertyData
    );
    return response.$id;
  } catch (error) {
    console.error('Error adding property:', error);
    throw error;
  }
};

export const getProperties = async (filters?: { city?: string; maxPrice?: number; minBedrooms?: number }) => {
  try {
    const queries = [Query.orderDesc('dateAdded')];
    
    if (filters?.city) {
      queries.push(Query.equal('city', filters.city));
    }
    
    const response = await databases.listDocuments(
      DATABASE_ID,
      PROPERTIES_COLLECTION_ID,
      queries
    );
    
    const properties: Property[] = response.documents.map(doc => {
      const { $id, $collectionId, $databaseId, $createdAt, $updatedAt, $permissions, ...data } = doc;
      return {
        id: $id,
        ...data
      } as Property;
    });
    
    return properties;
  } catch (error) {
    console.error('Error getting properties:', error);
    throw error;
  }
};

export const getPropertiesByAgent = async (agentId: string) => {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      PROPERTIES_COLLECTION_ID,
      [
        Query.equal('agentId', agentId),
        Query.orderDesc('dateAdded')
      ]
    );
    
    const properties: Property[] = response.documents.map(doc => {
      const { $id, $collectionId, $databaseId, $createdAt, $updatedAt, $permissions, ...data } = doc;
      return {
        id: $id,
        ...data
      } as Property;
    });
    
    return properties;
  } catch (error) {
    console.error('Error getting agent properties:', error);
    throw error;
  }
};

export const updateProperty = async (propertyId: string, updates: Partial<Property>) => {
  try {
    await databases.updateDocument(
      DATABASE_ID,
      PROPERTIES_COLLECTION_ID,
      propertyId,
      { ...updates, dateUpdated: new Date().toISOString() }
    );
  } catch (error) {
    console.error('Error updating property:', error);
    throw error;
  }
};

export const deleteProperty = async (propertyId: string) => {
  try {
    await databases.deleteDocument(
      DATABASE_ID,
      PROPERTIES_COLLECTION_ID,
      propertyId
    );
  } catch (error) {
    console.error('Error deleting property:', error);
    throw error;
  }
};
