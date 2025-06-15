
import { databases, DATABASE_ID, PROPERTIES_COLLECTION_ID, FEATURED_REQUESTS_COLLECTION_ID, APPLICATIONS_COLLECTION_ID, MESSAGES_COLLECTION_ID, CONVERSATIONS_COLLECTION_ID } from '@/lib/appwrite';
import { seedProperties } from './services/propertySeeder';
import { seedFeaturedRequests } from './services/featuredRequestSeeder';
import { seedApplications } from './services/applicationSeeder';
import { seedConversations, seedMessages } from './services/conversationSeeder';

export const seedDatabase = async () => {
  try {
    console.log('Starting database seeding...');
    
    // 1. Create Properties
    const createdProperties = await seedProperties();

    // 2. Create Featured Requests
    const featuredRequests = await seedFeaturedRequests(createdProperties);

    // 3. Create Applications
    const applications = await seedApplications(createdProperties);

    // 4. Create Conversations
    const createdConversations = await seedConversations(createdProperties);

    // 5. Create Messages
    const messages = await seedMessages(createdConversations);

    console.log('✅ Database seeding completed successfully!');
    console.log(`Created ${createdProperties.length} properties in Abuja, Nigeria`);
    console.log(`Created ${featuredRequests.length} featured requests`);
    console.log(`Created ${applications.length} applications`);
    console.log(`Created ${createdConversations.length} conversations`);
    console.log(`Created ${messages.length} messages`);
    console.log('💰 All prices are in Nigerian Naira (₦)');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
};

// Helper function to clear all data (use with caution!)
export const clearDatabase = async () => {
  try {
    console.log('⚠️  Clearing database...');
    
    const collections = [
      { id: MESSAGES_COLLECTION_ID, name: 'Messages' },
      { id: CONVERSATIONS_COLLECTION_ID, name: 'Conversations' },
      { id: APPLICATIONS_COLLECTION_ID, name: 'Applications' },
      { id: FEATURED_REQUESTS_COLLECTION_ID, name: 'Featured Requests' },
      { id: PROPERTIES_COLLECTION_ID, name: 'Properties' }
    ];

    for (const collection of collections) {
      const response = await databases.listDocuments(DATABASE_ID, collection.id);
      for (const doc of response.documents) {
        await databases.deleteDocument(DATABASE_ID, collection.id, doc.$id);
      }
      console.log(`Cleared ${response.documents.length} documents from ${collection.name}`);
    }
    
    console.log('✅ Database cleared successfully!');
  } catch (error) {
    console.error('❌ Error clearing database:', error);
    throw error;
  }
};
