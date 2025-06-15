
import { databases, DATABASE_ID, PROPERTIES_COLLECTION_ID } from '@/lib/appwrite';
import { ID } from 'appwrite';
import { generateProperties } from '../utils/propertyGenerator';

export const seedProperties = async () => {
  console.log('Creating 55+ properties in Abuja, Nigeria...');
  const sampleProperties = generateProperties(55);
  const createdProperties = [];
  
  for (const property of sampleProperties) {
    const response = await databases.createDocument(
      DATABASE_ID,
      PROPERTIES_COLLECTION_ID,
      ID.unique(),
      property
    );
    createdProperties.push(response);
    console.log(`Created property: ${property.title} - ₦${property.price.toLocaleString()}`);
  }
  
  return createdProperties;
};
