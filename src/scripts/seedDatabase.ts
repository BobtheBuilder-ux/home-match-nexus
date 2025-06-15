
import { databases, DATABASE_ID, PROPERTIES_COLLECTION_ID, FEATURED_REQUESTS_COLLECTION_ID, APPLICATIONS_COLLECTION_ID, MESSAGES_COLLECTION_ID, CONVERSATIONS_COLLECTION_ID } from '@/lib/appwrite';
import { ID } from 'appwrite';

// Sample user IDs (you should replace these with actual user IDs from your auth system)
const SAMPLE_AGENT_IDS = [
  'agent_001',
  'agent_002', 
  'agent_003'
];

const SAMPLE_TENANT_IDS = [
  'tenant_001',
  'tenant_002',
  'tenant_003',
  'tenant_004',
  'tenant_005'
];

const sampleProperties = [
  {
    title: "Modern Downtown Apartment with City Views",
    description: "Stunning 2-bedroom apartment in the heart of downtown with panoramic city views, modern amenities, and walking distance to restaurants and shopping.",
    address: "123 Main St, Apt 15A",
    city: "Seattle",
    state: "WA",
    price: 2800,
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    propertyType: "apartment" as const,
    status: "active" as const,
    images: [
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop"
    ],
    agentId: SAMPLE_AGENT_IDS[0],
    dateAdded: "2024-01-15T10:00:00Z",
    dateUpdated: "2024-01-15T10:00:00Z",
    isFeatured: true,
    featuredRequestStatus: "approved" as const
  },
  {
    title: "Charming Victorian House in Historic District",
    description: "Beautiful 3-bedroom Victorian house with original hardwood floors, updated kitchen, and private garden in historic neighborhood.",
    address: "456 Oak Avenue",
    city: "Denver",
    state: "CO", 
    price: 3200,
    bedrooms: 3,
    bathrooms: 2.5,
    area: 1800,
    propertyType: "house" as const,
    status: "active" as const,
    images: [
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop"
    ],
    agentId: SAMPLE_AGENT_IDS[1],
    dateAdded: "2024-01-20T14:30:00Z",
    dateUpdated: "2024-01-20T14:30:00Z",
    isFeatured: false,
    featuredRequestStatus: "none" as const
  },
  {
    title: "Luxury Studio with Premium Amenities",
    description: "High-end studio apartment with premium finishes, gym access, rooftop terrace, and concierge service in prime location.",
    address: "789 Pine Street, Unit 25B",
    city: "San Francisco",
    state: "CA",
    price: 2400,
    bedrooms: 0,
    bathrooms: 1,
    area: 600,
    propertyType: "studio" as const,
    status: "active" as const,
    images: [
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&h=600&fit=crop"
    ],
    agentId: SAMPLE_AGENT_IDS[2],
    dateAdded: "2024-02-01T09:15:00Z",
    dateUpdated: "2024-02-01T09:15:00Z",
    isFeatured: true,
    featuredRequestStatus: "approved" as const
  },
  {
    title: "Spacious Family Home with Backyard",
    description: "Perfect family home with 4 bedrooms, large backyard, garage, and located in excellent school district.",
    address: "321 Elm Drive",
    city: "Austin",
    state: "TX",
    price: 2100,
    bedrooms: 4,
    bathrooms: 3,
    area: 2200,
    propertyType: "house" as const,
    status: "active" as const,
    images: [
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop"
    ],
    agentId: SAMPLE_AGENT_IDS[0],
    dateAdded: "2024-02-05T16:45:00Z",
    dateUpdated: "2024-02-05T16:45:00Z",
    isFeatured: false,
    featuredRequestStatus: "pending" as const
  },
  {
    title: "Cozy Shared Living Space",
    description: "Affordable shared living space with private bedroom, shared kitchen and living area, perfect for young professionals.",
    address: "654 Maple Lane, Room 3",
    city: "Portland",
    state: "OR",
    price: 800,
    bedrooms: 1,
    bathrooms: 1,
    area: 400,
    propertyType: "shared" as const,
    status: "draft" as const,
    images: [],
    agentId: SAMPLE_AGENT_IDS[1],
    dateAdded: "2024-02-10T11:20:00Z",
    dateUpdated: "2024-02-10T11:20:00Z",
    isFeatured: false,
    featuredRequestStatus: "none" as const
  }
];

export const seedDatabase = async () => {
  try {
    console.log('Starting database seeding...');
    
    // 1. Create Properties
    console.log('Creating properties...');
    const createdProperties = [];
    for (const property of sampleProperties) {
      const response = await databases.createDocument(
        DATABASE_ID,
        PROPERTIES_COLLECTION_ID,
        ID.unique(),
        property
      );
      createdProperties.push(response);
      console.log(`Created property: ${property.title}`);
    }

    // 2. Create Featured Requests
    console.log('Creating featured requests...');
    const featuredRequests = [
      {
        propertyId: createdProperties[0].$id,
        agentId: SAMPLE_AGENT_IDS[0],
        propertyTitle: createdProperties[0].title,
        requestDate: "2024-01-14T08:00:00Z",
        status: "approved" as const,
        adminNotes: "Excellent property with great photos and description."
      },
      {
        propertyId: createdProperties[3].$id,
        agentId: SAMPLE_AGENT_IDS[0],
        propertyTitle: createdProperties[3].title,
        requestDate: "2024-02-04T10:30:00Z",
        status: "pending" as const
      }
    ];

    for (const request of featuredRequests) {
      await databases.createDocument(
        DATABASE_ID,
        FEATURED_REQUESTS_COLLECTION_ID,
        ID.unique(),
        request
      );
      console.log(`Created featured request for: ${request.propertyTitle}`);
    }

    // 3. Create Applications
    console.log('Creating applications...');
    const applications = [
      {
        propertyId: createdProperties[0].$id,
        applicantId: SAMPLE_TENANT_IDS[0],
        status: "submitted" as const,
        submittedAt: "2024-01-16T14:20:00Z",
        firstName: "John",
        lastName: "Smith",
        email: "john.smith@email.com",
        phone: "+1-555-0101",
        dateOfBirth: "1990-05-15",
        employerName: "Tech Corp Inc",
        jobTitle: "Software Engineer",
        monthlyIncome: 8500,
        employmentDuration: "3 years",
        currentAddress: "789 Current St, Seattle, WA",
        moveInDate: "2024-02-01",
        reasonForMoving: "Relocating for work",
        references: [
          {
            name: "Jane Doe",
            relationship: "Previous Landlord", 
            phone: "+1-555-0102",
            email: "jane.doe@email.com"
          }
        ],
        pets: false,
        additionalComments: "Looking forward to living in downtown area."
      },
      {
        propertyId: createdProperties[1].$id,
        applicantId: SAMPLE_TENANT_IDS[1],
        status: "under_review" as const,
        submittedAt: "2024-01-22T09:45:00Z",
        reviewedAt: "2024-01-23T10:15:00Z",
        firstName: "Sarah",
        lastName: "Johnson",
        email: "sarah.johnson@email.com",
        phone: "+1-555-0201",
        dateOfBirth: "1988-09-22",
        employerName: "Design Studio LLC",
        jobTitle: "Graphic Designer",
        monthlyIncome: 6200,
        employmentDuration: "5 years",
        currentAddress: "456 Old Address, Denver, CO",
        moveInDate: "2024-03-01",
        reasonForMoving: "Want more space",
        references: [
          {
            name: "Mike Wilson",
            relationship: "Employer",
            phone: "+1-555-0202", 
            email: "mike.wilson@designstudio.com"
          }
        ],
        pets: true,
        petDetails: "One small dog, well-trained",
        additionalComments: "Love the historic character of the house."
      }
    ];

    for (const application of applications) {
      await databases.createDocument(
        DATABASE_ID,
        APPLICATIONS_COLLECTION_ID,
        ID.unique(),
        application
      );
      console.log(`Created application from: ${application.firstName} ${application.lastName}`);
    }

    // 4. Create Conversations
    console.log('Creating conversations...');
    const conversations = [
      {
        propertyId: createdProperties[0].$id,
        agentId: SAMPLE_AGENT_IDS[0],
        tenantId: SAMPLE_TENANT_IDS[0],
        propertyTitle: createdProperties[0].title,
        lastMessage: "Is the apartment still available?",
        lastMessageTime: "2024-01-16T10:30:00Z",
        unreadCount: 1
      },
      {
        propertyId: createdProperties[1].$id,
        agentId: SAMPLE_AGENT_IDS[1],
        tenantId: SAMPLE_TENANT_IDS[1],
        propertyTitle: createdProperties[1].title,
        lastMessage: "Thank you for the quick response!",
        lastMessageTime: "2024-01-22T15:45:00Z",
        unreadCount: 0
      }
    ];

    const createdConversations = [];
    for (const conversation of conversations) {
      const response = await databases.createDocument(
        DATABASE_ID,
        CONVERSATIONS_COLLECTION_ID,
        ID.unique(),
        conversation
      );
      createdConversations.push(response);
      console.log(`Created conversation for: ${conversation.propertyTitle}`);
    }

    // 5. Create Messages
    console.log('Creating messages...');
    const messages = [
      // Conversation 1 messages
      {
        conversationId: createdConversations[0].$id,
        senderId: SAMPLE_TENANT_IDS[0],
        senderName: "John Smith",
        content: "Hi, I'm interested in the downtown apartment. Is it still available?",
        timestamp: "2024-01-16T10:00:00Z",
        read: true
      },
      {
        conversationId: createdConversations[0].$id,
        senderId: SAMPLE_AGENT_IDS[0],
        senderName: "Agent Mike",
        content: "Yes, it's still available! Would you like to schedule a viewing?",
        timestamp: "2024-01-16T10:15:00Z",
        read: true
      },
      {
        conversationId: createdConversations[0].$id,
        senderId: SAMPLE_TENANT_IDS[0],
        senderName: "John Smith", 
        content: "Is the apartment still available?",
        timestamp: "2024-01-16T10:30:00Z",
        read: false
      },
      // Conversation 2 messages
      {
        conversationId: createdConversations[1].$id,
        senderId: SAMPLE_TENANT_IDS[1],
        senderName: "Sarah Johnson",
        content: "I love the Victorian house! Can you tell me more about the neighborhood?",
        timestamp: "2024-01-22T15:00:00Z",
        read: true
      },
      {
        conversationId: createdConversations[1].$id,
        senderId: SAMPLE_AGENT_IDS[1],
        senderName: "Agent Lisa",
        content: "It's a wonderful historic district with great walkability and local cafes. Very safe and family-friendly!",
        timestamp: "2024-01-22T15:30:00Z",
        read: true
      },
      {
        conversationId: createdConversations[1].$id,
        senderId: SAMPLE_TENANT_IDS[1],
        senderName: "Sarah Johnson",
        content: "Thank you for the quick response!",
        timestamp: "2024-01-22T15:45:00Z",
        read: true
      }
    ];

    for (const message of messages) {
      await databases.createDocument(
        DATABASE_ID,
        MESSAGES_COLLECTION_ID,
        ID.unique(),
        message
      );
      console.log(`Created message from: ${message.senderName}`);
    }

    console.log('✅ Database seeding completed successfully!');
    console.log(`Created ${createdProperties.length} properties`);
    console.log(`Created ${featuredRequests.length} featured requests`);
    console.log(`Created ${applications.length} applications`);
    console.log(`Created ${createdConversations.length} conversations`);
    console.log(`Created ${messages.length} messages`);
    
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
