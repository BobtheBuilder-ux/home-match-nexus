
import { databases, DATABASE_ID, FEATURED_REQUESTS_COLLECTION_ID } from '@/lib/appwrite';
import { ID } from 'appwrite';

export const seedFeaturedRequests = async (properties: any[]) => {
  console.log('Creating featured requests...');
  const featuredProperties = properties.filter(p => p.isFeatured);
  const featuredRequests = featuredProperties.slice(0, 10).map(property => ({
    propertyId: property.$id,
    agentId: property.agentId,
    propertyTitle: property.title,
    requestDate: new Date(Date.now() - Math.floor(Math.random() * 15) * 24 * 60 * 60 * 1000).toISOString(),
    status: "approved" as const,
    adminNotes: "Quality property in premium Abuja location."
  }));

  const createdRequests = [];
  for (const request of featuredRequests) {
    const response = await databases.createDocument(
      DATABASE_ID,
      FEATURED_REQUESTS_COLLECTION_ID,
      ID.unique(),
      request
    );
    createdRequests.push(response);
    console.log(`Created featured request for: ${request.propertyTitle}`);
  }
  
  return createdRequests;
};
