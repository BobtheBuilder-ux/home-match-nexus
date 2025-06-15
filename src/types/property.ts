
export interface Property {
  id: string;
  title: string;
  description: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  size_sqft: number;
  property_type: 'apartment' | 'house' | 'studio' | 'shared' | 'shortlet';
  status: 'available' | 'rented' | 'pending';
  images: string[];
  amenities: string[];
  agent_id: string;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}
