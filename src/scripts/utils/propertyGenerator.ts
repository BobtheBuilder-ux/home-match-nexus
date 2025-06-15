
import { ABUJA_AREAS, STREET_NAMES, PROPERTY_DESCRIPTIONS, SAMPLE_AGENT_IDS } from '../constants/sampleData';

export const generateProperties = (count: number = 55) => {
  const properties = [];
  
  for (let i = 0; i < count; i++) {
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
