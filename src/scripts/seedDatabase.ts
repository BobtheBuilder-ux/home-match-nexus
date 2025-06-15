
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, deleteDoc } from 'firebase/firestore';
import { generateProperties } from './utils/propertyGenerator';

export const seedDatabase = async () => {
  try {
    console.log('Starting database seeding with Firebase...');
    
    // 1. Create Properties
    const sampleProperties = generateProperties(55);
    const createdProperties = [];
    
    for (const property of sampleProperties) {
      const docRef = await addDoc(collection(db, 'properties'), property);
      createdProperties.push({ id: docRef.id, ...property });
      console.log(`Created property: ${property.title} - ₦${property.price.toLocaleString()}`);
    }

    console.log('✅ Database seeding completed successfully with Firebase!');
    console.log(`Created ${createdProperties.length} properties in Abuja, Nigeria`);
    console.log('💰 All prices are in Nigerian Naira (₦)');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
};

// Helper function to clear all data (use with caution!)
export const clearDatabase = async () => {
  try {
    console.log('⚠️  Clearing Firebase database...');
    
    const collections = ['properties', 'users', 'applications', 'conversations', 'messages', 'featuredRequests'];

    for (const collectionName of collections) {
      const querySnapshot = await getDocs(collection(db, collectionName));
      const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
      await Promise.all(deletePromises);
      console.log(`Cleared ${querySnapshot.docs.length} documents from ${collectionName}`);
    }
    
    console.log('✅ Firebase database cleared successfully!');
  } catch (error) {
    console.error('❌ Error clearing Firebase database:', error);
    throw error;
  }
};
