import { databases, DATABASE_ID, PROPERTIES_COLLECTION_ID, FEATURED_REQUESTS_COLLECTION_ID, APPLICATIONS_COLLECTION_ID, MESSAGES_COLLECTION_ID, CONVERSATIONS_COLLECTION_ID } from '@/lib/appwrite';
import { ID } from 'appwrite';

// Sample user IDs (you should replace these with actual user IDs from your auth system)
const SAMPLE_AGENT_IDS = [
  'agent_001',
  'agent_002', 
  'agent_003',
  'agent_004',
  'agent_005'
];

const SAMPLE_TENANT_IDS = [
  'tenant_001',
  'tenant_002',
  'tenant_003',
  'tenant_004',
  'tenant_005'
];

// Abuja neighborhoods and areas
const ABUJA_AREAS = [
  "Maitama", "Asokoro", "Wuse 2", "Garki", "Utako", "Jahi", "Life Camp", 
  "Gwarinpa", "Kubwa", "Lokogoma", "Kado", "Gudu", "Wuye", "Katampe", "Durumi",
  "Area 1", "Area 2", "Area 3", "Area 8", "Area 10", "Area 11", "Central Business District",
  "Lugbe", "Airport Road", "Galadimawa", "Kaura", "Dakwo", "Mbora", "Karmo"
];

// Street names and property types for variety
const STREET_NAMES = [
  "Yakubu Gowon Street", "Shehu Shagari Way", "Nnamdi Azikiwe Street", "Herbert Macaulay Way",
  "Tafawa Balewa Street", "Ahmadu Bello Way", "Independence Avenue", "Constitution Avenue",
  "Diplomatic Drive", "Lake Chad Crescent", "Niger River Street", "Benue Close",
  "Victoria Falls Drive", "Sahara Street", "Atlas Mountains Avenue", "Kilimanjaro Road"
];

const PROPERTY_DESCRIPTIONS = [
  "Luxurious apartment with modern amenities and excellent security",
  "Spacious family home with beautiful garden and parking space",
  "Contemporary design with premium finishes and great location",
  "Elegant property in a serene environment with 24/7 security",
  "Modern living space with all necessary amenities included",
  "Beautiful home perfect for families with children",
  "Stylish apartment with panoramic city views",
  "Comfortable living space in a well-developed area",
  "Premium property with excellent infrastructure and facilities",
  "Cozy home with modern kitchen and spacious bedrooms"
];

const generateProperties = () => {
  const properties = [];
  
  for (let i = 0; i < 55; i++) {
    const area = ABUJA_AREAS[Math.floor(Math.random() * ABUJA_AREAS.length)];
    const street = STREET_NAMES[Math.floor(Math.random() * STREET_NAMES.length)];
    const description = PROPERTY_DESCRIPTIONS[Math.floor(Math.random() * PROPERTY_DESCRIPTIONS.length)];
    const bedrooms = Math.floor(Math.random() * 5) + 1; // 1-5 bedrooms
    const bathrooms = Math.floor(Math.random() * 3) + 1; // 1-3 bathrooms
    const propertyTypes = ['apartment', 'house', 'studio', 'shared'];
    const propertyType = propertyTypes[Math.floor(Math.random() * propertyTypes.length)];
    
    // Price ranges in Naira based on area and property type
    let basePrice;
    if (['Maitama', 'Asokoro', 'Wuse 2'].includes(area)) {
      basePrice = Math.floor(Math.random() * 2000000) + 1500000; // ₦1.5M - ₦3.5M
    } else if (['Garki', 'Utako', 'Jahi', 'Life Camp'].includes(area)) {
      basePrice = Math.floor(Math.random() * 1500000) + 800000; // ₦800K - ₦2.3M
    } else {
      basePrice = Math.floor(Math.random() * 1000000) + 400000; // ₦400K - ₦1.4M
    }
    
    // Adjust price based on property type and bedrooms
    let finalPrice = basePrice;
    if (propertyType === 'studio') finalPrice *= 0.6;
    if (propertyType === 'shared') finalPrice *= 0.4;
    finalPrice += (bedrooms - 1) * 200000;
    
    const property = {
      title: `${bedrooms}-Bedroom ${propertyType.charAt(0).toUpperCase() + propertyType.slice(1)} in ${area}`,
      description: `${description} Located in the prestigious ${area} area of Abuja with easy access to major roads and amenities.`,
      address: `${Math.floor(Math.random() * 99) + 1} ${street}`,
      city: "Abuja",
      state: "FCT",
      price: Math.floor(finalPrice),
      bedrooms: propertyType === 'studio' ? 0 : bedrooms,
      bathrooms: bathrooms,
      area: Math.floor(Math.random() * 1500) + 500, // 500-2000 sqft
      propertyType: propertyType as 'apartment' | 'house' | 'studio' | 'shared',
      status: Math.random() > 0.1 ? 'active' as const : 'draft' as const, // 90% active
      images: [
        "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&h=600&fit=crop"
      ].slice(0, Math.floor(Math.random() * 3) + 1), // 1-3 images per property
      agentId: SAMPLE_AGENT_IDS[Math.floor(Math.random() * SAMPLE_AGENT_IDS.length)],
      dateAdded: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(), // Random date within last 30 days
      dateUpdated: new Date().toISOString(),
      isFeatured: Math.random() > 0.8, // 20% featured
      featuredRequestStatus: Math.random() > 0.7 ? 'approved' as const : 'none' as const
    };
    
    properties.push(property);
  }
  
  return properties;
};

export const seedDatabase = async () => {
  try {
    console.log('Starting database seeding...');
    
    // 1. Create Properties
    console.log('Creating 55+ properties in Abuja, Nigeria...');
    const sampleProperties = generateProperties();
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

    // 2. Create Featured Requests
    console.log('Creating featured requests...');
    const featuredProperties = createdProperties.filter(p => p.isFeatured);
    const featuredRequests = featuredProperties.slice(0, 10).map(property => ({
      propertyId: property.$id,
      agentId: property.agentId,
      propertyTitle: property.title,
      requestDate: new Date(Date.now() - Math.floor(Math.random() * 15) * 24 * 60 * 60 * 1000).toISOString(),
      status: "approved" as const,
      adminNotes: "Quality property in premium Abuja location."
    }));

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
    const applications = createdProperties.slice(0, 15).map((property, index) => ({
      propertyId: property.$id,
      applicantId: SAMPLE_TENANT_IDS[index % SAMPLE_TENANT_IDS.length],
      status: ["submitted", "under_review", "approved"][Math.floor(Math.random() * 3)] as "submitted" | "under_review" | "approved",
      submittedAt: new Date(Date.now() - Math.floor(Math.random() * 10) * 24 * 60 * 60 * 1000).toISOString(),
      firstName: ["Adamu", "Fatima", "Ibrahim", "Aisha", "Mohammed", "Hauwa", "Usman", "Zainab"][index % 8],
      lastName: ["Bello", "Sani", "Garba", "Aliyu", "Musa", "Yakubu", "Shehu", "Umar"][index % 8],
      email: `user${index + 1}@email.com`,
      phone: `+234-${Math.floor(Math.random() * 900000000) + 700000000}`,
      dateOfBirth: `${1980 + Math.floor(Math.random() * 25)}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
      employerName: ["Federal Ministry", "Abuja Tech Hub", "Nigerian National Petroleum Corporation", "Central Bank of Nigeria", "Dangote Group"][Math.floor(Math.random() * 5)],
      jobTitle: ["Software Engineer", "Civil Servant", "Financial Analyst", "Project Manager", "Business Analyst"][Math.floor(Math.random() * 5)],
      monthlyIncome: Math.floor(Math.random() * 1000000) + 300000, // ₦300K - ₦1.3M
      employmentDuration: `${Math.floor(Math.random() * 8) + 1} years`,
      currentAddress: `${Math.floor(Math.random() * 99) + 1} Current Street, ${ABUJA_AREAS[Math.floor(Math.random() * ABUJA_AREAS.length)]}, Abuja`,
      moveInDate: new Date(Date.now() + Math.floor(Math.random() * 60) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      reasonForMoving: ["Job relocation", "Family expansion", "Better location", "Upgrade lifestyle"][Math.floor(Math.random() * 4)],
      references: [
        {
          name: ["Musa Ibrahim", "Fatima Ahmed", "Yusuf Mohammed"][Math.floor(Math.random() * 3)],
          relationship: ["Previous Landlord", "Employer", "Family Friend"][Math.floor(Math.random() * 3)],
          phone: `+234-${Math.floor(Math.random() * 900000000) + 700000000}`,
          email: `reference${index}@email.com`
        }
      ],
      pets: Math.random() > 0.7,
      additionalComments: "Looking forward to renting in Abuja."
    }));

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
    const conversations = createdProperties.slice(0, 8).map((property, index) => ({
      propertyId: property.$id,
      agentId: property.agentId,
      tenantId: SAMPLE_TENANT_IDS[index % SAMPLE_TENANT_IDS.length],
      propertyTitle: property.title,
      lastMessage: [
        "Is this property still available?",
        "Can I schedule a viewing?", 
        "What's included in the rent?",
        "Is the area safe and secure?",
        "Are utilities included?",
        "When can I move in?",
        "Can I negotiate the price?",
        "Is parking available?"
      ][index % 8],
      lastMessageTime: new Date(Date.now() - Math.floor(Math.random() * 5) * 24 * 60 * 60 * 1000).toISOString(),
      unreadCount: Math.floor(Math.random() * 3)
    }));

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
    const messages = [];
    createdConversations.forEach((conversation, index) => {
      // Add 2-4 messages per conversation
      const messageCount = Math.floor(Math.random() * 3) + 2;
      for (let i = 0; i < messageCount; i++) {
        messages.push({
          conversationId: conversation.$id,
          senderId: i % 2 === 0 ? SAMPLE_TENANT_IDS[index % SAMPLE_TENANT_IDS.length] : conversation.agentId,
          senderName: i % 2 === 0 ? `Tenant ${index + 1}` : `Agent ${index + 1}`,
          content: i % 2 === 0 ? 
            ["Hi, I'm interested in this property", "Can you provide more details?", "Is it still available?", "Thank you for the information"][Math.floor(Math.random() * 4)] :
            ["Hello! Yes, it's available", "I'd be happy to help", "Let me know if you need anything else", "You're welcome!"][Math.floor(Math.random() * 4)],
          timestamp: new Date(Date.now() - (messageCount - i) * 2 * 60 * 60 * 1000).toISOString(),
          read: Math.random() > 0.3
        });
      }
    });

    for (const message of messages) {
      await databases.createDocument(
        DATABASE_ID,
        MESSAGES_COLLECTION_ID,
        ID.unique(),
        message
      );
    }
    console.log(`Created ${messages.length} messages`);

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
