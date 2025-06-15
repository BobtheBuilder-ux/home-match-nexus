
import { nanoid } from 'nanoid';

interface PropertyData {
  id: string;
  title: string;
  description: string;
  address: string;
  city: string;
  state: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  propertyType: 'apartment' | 'house' | 'studio' | 'shared' | 'shortlet';
  status: 'active' | 'rented' | 'draft';
  images: string[];
  agentId: string;
  dateAdded: string;
  dateUpdated: string;
  isFeatured?: boolean;
  amenities: string[];
}

const abujaDistricts = [
  'Maitama', 'Asokoro', 'Garki', 'Wuse', 'Gwarinpa', 'Kubwa', 
  'Lugbe', 'Kuje', 'Nyanya', 'Karmo', 'Lifecamp', 'Jabi',
  'Utako', 'Gudu', 'Kaura', 'Kado', 'Dakwo', 'Durumi',
  'Wuye', 'Katampe', 'Lokogoma', 'Galadimawa', 'Jahi'
];

const propertyTypes: PropertyData['propertyType'][] = ['apartment', 'house', 'studio', 'shared', 'shortlet'];
const statuses: PropertyData['status'][] = ['active', 'rented', 'draft'];

const availableAmenities = [
  'Air Conditioning', 'Swimming Pool', 'Gym', 'Parking Space', 'Security',
  'Generator Backup', 'Water Supply', 'Fitted Kitchen', 'Balcony',
  'Garden', 'Elevator', 'CCTV', 'Intercom', 'Laundry', 'Wi-Fi',
  'Cable TV', 'Playground', 'Shopping Mall Nearby', 'Hospital Nearby',
  'School Nearby', 'Public Transport', 'Quiet Neighborhood'
];

const propertyImages = [
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&h=600&fit=crop'
];

const streetNames = [
  'Yakubu Gowon Street', 'Shehu Shagari Way', 'Nnamdi Azikiwe Street', 
  'Herbert Macaulay Way', 'Tafawa Balewa Street', 'Ahmadu Bello Way',
  'Independence Avenue', 'Constitution Avenue', 'Diplomatic Drive',
  'Lake Chad Crescent', 'Niger River Street', 'Benue Close'
];

const generatePropertyTitle = (type: string, district: string, bedrooms: number): string => {
  const descriptors = ['Modern', 'Luxury', 'Spacious', 'Elegant', 'Beautiful', 'Stunning', 'Executive', 'Premium'];
  const descriptor = descriptors[Math.floor(Math.random() * descriptors.length)];
  
  if (type === 'studio') {
    return `${descriptor} Studio Apartment in ${district}`;
  } else if (type === 'shared') {
    return `${descriptor} Shared Apartment in ${district}`;
  } else if (type === 'shortlet') {
    return `${descriptor} ${bedrooms}-Bedroom Shortlet in ${district}`;
  } else {
    return `${descriptor} ${bedrooms}-Bedroom ${type.charAt(0).toUpperCase() + type.slice(1)} in ${district}`;
  }
};

const generateDescription = (type: string, bedrooms: number, bathrooms: number, area: number, amenities: string[]): string => {
  const amenityList = amenities.slice(0, 4).join(', ').toLowerCase();
  
  const descriptions = [
    `This ${type} features ${bedrooms} bedroom${bedrooms > 1 ? 's' : ''} and ${bathrooms} bathroom${bathrooms > 1 ? 's' : ''} across ${area} square feet. The property comes with ${amenityList}. Perfect for ${type === 'shared' ? 'young professionals' : type === 'shortlet' ? 'short-term stays' : 'families and individuals'} looking for comfortable living in Abuja.`,
    
    `A well-designed ${bedrooms}-bedroom ${type} offering ${area} sq ft of living space. This property includes ${amenityList} and is ideal for those seeking quality accommodation in a prime location.`,
    
    `Experience comfortable living in this ${bedrooms}-bedroom ${type} with ${bathrooms} bathroom${bathrooms > 1 ? 's' : ''}. Spanning ${area} square feet, it features ${amenityList}. Great for professionals and families alike.`,
    
    `This beautiful ${type} offers ${bedrooms} spacious bedroom${bedrooms > 1 ? 's' : ''} and ${bathrooms} modern bathroom${bathrooms > 1 ? 's' : ''} in ${area} sq ft. Amenities include ${amenityList}. Perfect location with excellent facilities.`
  ];
  
  return descriptions[Math.floor(Math.random() * descriptions.length)];
};

const generateAmenities = (propertyType: string): string[] => {
  const baseAmenities = ['Security', 'Water Supply', 'Parking Space'];
  const luxuryAmenities = ['Swimming Pool', 'Gym', 'Elevator', 'CCTV'];
  const standardAmenities = ['Air Conditioning', 'Generator Backup', 'Fitted Kitchen'];
  const locationAmenities = ['School Nearby', 'Hospital Nearby', 'Shopping Mall Nearby'];
  
  let selectedAmenities = [...baseAmenities];
  
  // Add type-specific amenities
  if (propertyType === 'house') {
    selectedAmenities.push('Garden', 'Balcony');
  }
  
  if (propertyType === 'apartment' || propertyType === 'house') {
    selectedAmenities.push(...standardAmenities.slice(0, 2));
  }
  
  // Add random luxury amenities (30% chance each)
  luxuryAmenities.forEach(amenity => {
    if (Math.random() < 0.3) {
      selectedAmenities.push(amenity);
    }
  });
  
  // Add random location amenities (50% chance each)
  locationAmenities.forEach(amenity => {
    if (Math.random() < 0.5) {
      selectedAmenities.push(amenity);
    }
  });
  
  // Add some random amenities
  const remainingAmenities = availableAmenities.filter(a => !selectedAmenities.includes(a));
  const randomCount = Math.floor(Math.random() * 3) + 1;
  
  for (let i = 0; i < randomCount && remainingAmenities.length > 0; i++) {
    const randomIndex = Math.floor(Math.random() * remainingAmenities.length);
    selectedAmenities.push(remainingAmenities.splice(randomIndex, 1)[0]);
  }
  
  return selectedAmenities;
};

export const generateProperties = (count: number): PropertyData[] => {
  const properties: PropertyData[] = [];
  const agentIds = Array.from({ length: 10 }, () => nanoid());

  for (let i = 0; i < count; i++) {
    const district = abujaDistricts[Math.floor(Math.random() * abujaDistricts.length)];
    const propertyType = propertyTypes[Math.floor(Math.random() * propertyTypes.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const streetName = streetNames[Math.floor(Math.random() * streetNames.length)];
    
    // Generate realistic bedroom/bathroom counts based on property type
    let bedrooms, bathrooms, area, basePrice;
    
    switch (propertyType) {
      case 'studio':
        bedrooms = 0;
        bathrooms = 1;
        area = Math.floor(Math.random() * 150) + 200; // 200-350 sqft
        basePrice = Math.floor(Math.random() * 500000) + 300000; // ₦300k-₦800k
        break;
      case 'shared':
        bedrooms = Math.floor(Math.random() * 2) + 2; // 2-3 bedrooms
        bathrooms = Math.floor(Math.random() * 2) + 1; // 1-2 bathrooms
        area = Math.floor(Math.random() * 300) + 400; // 400-700 sqft
        basePrice = Math.floor(Math.random() * 400000) + 200000; // ₦200k-₦600k
        break;
      case 'shortlet':
        bedrooms = Math.floor(Math.random() * 3) + 1; // 1-3 bedrooms
        bathrooms = Math.floor(Math.random() * 2) + 1; // 1-2 bathrooms
        area = Math.floor(Math.random() * 400) + 300; // 300-700 sqft
        basePrice = Math.floor(Math.random() * 40000) + 15000; // ₦15k-₦55k per night
        break;
      case 'apartment':
        bedrooms = Math.floor(Math.random() * 4) + 1; // 1-4 bedrooms
        bathrooms = Math.min(bedrooms, Math.floor(Math.random() * 3) + 1); // 1-3 bathrooms
        area = Math.floor(Math.random() * 600) + 400; // 400-1000 sqft
        basePrice = Math.floor(Math.random() * 2000000) + 500000; // ₦500k-₦2.5M
        break;
      case 'house':
        bedrooms = Math.floor(Math.random() * 5) + 2; // 2-6 bedrooms
        bathrooms = Math.min(bedrooms, Math.floor(Math.random() * 4) + 2); // 2-5 bathrooms
        area = Math.floor(Math.random() * 1000) + 800; // 800-1800 sqft
        basePrice = Math.floor(Math.random() * 4000000) + 1000000; // ₦1M-₦5M
        break;
      default:
        bedrooms = 2;
        bathrooms = 2;
        area = 500;
        basePrice = 800000;
    }

    const amenities = generateAmenities(propertyType);
    const title = generatePropertyTitle(propertyType, district, bedrooms);
    const description = generateDescription(propertyType, bedrooms, bathrooms, area, amenities);
    
    // Generate property images (3-6 images per property)
    const imageCount = Math.floor(Math.random() * 4) + 3;
    const shuffledImages = [...propertyImages].sort(() => 0.5 - Math.random());
    const images = shuffledImages.slice(0, imageCount);

    // Add some price variation based on district (premium areas cost more)
    const premiumDistricts = ['Maitama', 'Asokoro', 'Wuse', 'Garki'];
    const isPremiumLocation = premiumDistricts.includes(district);
    const finalPrice = isPremiumLocation ? Math.floor(basePrice * 1.3) : basePrice;

    const property: PropertyData = {
      id: nanoid(),
      title,
      description,
      address: `${Math.floor(Math.random() * 99) + 1} ${streetName}`,
      city: district,
      state: 'FCT',
      price: finalPrice,
      bedrooms,
      bathrooms,
      area,
      propertyType,
      status,
      images,
      amenities,
      agentId: agentIds[Math.floor(Math.random() * agentIds.length)],
      dateAdded: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
      dateUpdated: new Date().toISOString(),
      isFeatured: Math.random() < 0.25 // 25% chance of being featured
    };

    properties.push(property);
  }

  return properties;
};
