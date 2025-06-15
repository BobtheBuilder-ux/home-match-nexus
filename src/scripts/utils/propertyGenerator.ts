
import { ABUJA_AREAS, STREET_NAMES, PROPERTY_DESCRIPTIONS, SAMPLE_AGENT_IDS } from '../constants/sampleData';

export const generateProperties = (count: number = 55) => {
  const properties = [];
  
  const sampleImages = [
    "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1494526585095-c41746248156?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop",
  ];

  const sampleVideos = [
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  ];
  
  for (let i = 0; i < count; i++) {
    const area = ABUJA_AREAS[Math.floor(Math.random() * ABUJA_AREAS.length)];
    const street = STREET_NAMES[Math.floor(Math.random() * STREET_NAMES.length)];
    const description = PROPERTY_DESCRIPTIONS[Math.floor(Math.random() * PROPERTY_DESCRIPTIONS.length)];
    const bedrooms = Math.floor(Math.random() * 5) + 1; // 1-5 bedrooms
    const bathrooms = Math.floor(Math.random() * 3) + 1; // 1-3 bathrooms

    // Randomly pick between normal and shortlet types
    let propertyTypes = ['apartment', 'house', 'studio', 'shared'];
    let isShortlet = Math.random() < 0.18; // About 18% shortlet
    let propertyType = isShortlet ? 'shortlet' : propertyTypes[Math.floor(Math.random() * propertyTypes.length)];

    // Price logic
    let basePrice;
    if (['Maitama', 'Asokoro', 'Wuse 2'].includes(area)) {
      basePrice = Math.floor(Math.random() * 2000000) + 1500000; // ₦1.5M - ₦3.5M (monthly/yearly)
    } else if (['Garki', 'Utako', 'Jahi', 'Life Camp'].includes(area)) {
      basePrice = Math.floor(Math.random() * 1500000) + 800000; // ₦800K - ₦2.3M
    } else {
      basePrice = Math.floor(Math.random() * 1000000) + 400000; // ₦400K - ₦1.4M
    }

    let finalPrice = basePrice;
    if (propertyType === 'studio') finalPrice *= 0.6;
    if (propertyType === 'shared') finalPrice *= 0.4;
    finalPrice += (bedrooms - 1) * 200000;

    // Special logic for shortlets (per night, smaller price)
    if (propertyType === 'shortlet') {
      finalPrice = Math.floor(Math.random() * 35000) + 10000; // ₦10k - ₦45k per night
    }
    
    const property = {
      title: isShortlet
        ? `Shortlet Apartment in ${area}`
        : `${bedrooms}-Bedroom ${propertyType.charAt(0).toUpperCase() + propertyType.slice(1)} in ${area}`,
      description: `${description} Located in the prestigious ${area} area of Abuja with easy access to major roads and amenities.`,
      address: `${Math.floor(Math.random() * 99) + 1} ${street}`,
      city: "Abuja",
      state: "FCT",
      price: Math.floor(finalPrice),
      bedrooms: propertyType === 'studio' ? 0 : bedrooms,
      bathrooms: bathrooms,
      area: Math.floor(Math.random() * 1500) + 500, // 500-2000 sqft
      propertyType: propertyType as 'apartment' | 'house' | 'studio' | 'shared' | 'shortlet',
      status: Math.random() > 0.1 ? 'active' as const : 'draft' as const,
      images: sampleImages.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 8) + 3),
      videos: sampleVideos.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3)),
      agentId: SAMPLE_AGENT_IDS[Math.floor(Math.random() * SAMPLE_AGENT_IDS.length)],
      dateAdded: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
      dateUpdated: new Date().toISOString(),
      isFeatured: Math.random() > 0.8,
      featuredRequestStatus: Math.random() > 0.7 ? 'approved' as const : 'none' as const
    };
    
    properties.push(property);
  }
  
  return properties;
};
