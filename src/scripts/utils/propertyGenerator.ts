
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
}

const abujaDistricts = [
  'Maitama', 'Asokoro', 'Garki', 'Wuse', 'Gwarinpa', 'Kubwa', 
  'Lugbe', 'Kuje', 'Nyanya', 'Karmo', 'Lifecamp', 'Jabi',
  'Utako', 'Gudu', 'Kaura', 'Kado', 'Dakwo', 'Durumi'
];

const propertyTypes: PropertyData['propertyType'][] = ['apartment', 'house', 'studio', 'shared', 'shortlet'];
const statuses: PropertyData['status'][] = ['active', 'rented', 'draft'];

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

const generateDescription = (type: string, bedrooms: number, bathrooms: number, area: number): string => {
  const amenities = [
    'fitted kitchen', 'air conditioning', 'parking space', 'security',
    'swimming pool', 'gym', 'generator backup', 'water supply',
    'modern fixtures', 'spacious rooms', 'good lighting', 'tiled floors'
  ];
  
  const selectedAmenities = amenities
    .sort(() => 0.5 - Math.random())
    .slice(0, Math.floor(Math.random() * 4) + 3)
    .join(', ');

  return `This ${type} features ${bedrooms} bedroom${bedrooms > 1 ? 's' : ''} and ${bathrooms} bathroom${bathrooms > 1 ? 's' : ''} across ${area} square feet. The property comes with ${selectedAmenities}. Perfect for ${type === 'shared' ? 'young professionals' : type === 'shortlet' ? 'short-term stays' : 'families and individuals'} looking for comfortable living in Abuja.`;
};

export const generateProperties = (count: number): PropertyData[] => {
  const properties: PropertyData[] = [];
  const agentIds = Array.from({ length: 10 }, () => nanoid());

  for (let i = 0; i < count; i++) {
    const district = abujaDistricts[Math.floor(Math.random() * abujaDistricts.length)];
    const propertyType = propertyTypes[Math.floor(Math.random() * propertyTypes.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    
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

    const title = generatePropertyTitle(propertyType, district, bedrooms);
    const description = generateDescription(propertyType, bedrooms, bathrooms, area);
    
    // Generate property images (placeholder URLs)
    const imageCount = Math.floor(Math.random() * 6) + 3; // 3-8 images
    const images = Array.from({ length: imageCount }, (_, index) => 
      `https://images.unsplash.com/photo-156789${1000 + i + index}?w=800&h=600&fit=crop`
    );

    const property: PropertyData = {
      id: nanoid(),
      title,
      description,
      address: `${Math.floor(Math.random() * 999) + 1} ${district} Street`,
      city: district,
      state: 'FCT',
      price: basePrice,
      bedrooms,
      bathrooms,
      area,
      propertyType,
      status,
      images,
      agentId: agentIds[Math.floor(Math.random() * agentIds.length)],
      dateAdded: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
      dateUpdated: new Date().toISOString(),
      isFeatured: Math.random() < 0.2 // 20% chance of being featured
    };

    properties.push(property);
  }

  return properties;
};
