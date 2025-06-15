export interface Property {
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
  status: 'active' | 'draft' | 'rented';
  images: string[];
  videos?: string[];
  agentId: string;
  dateAdded: string;
  dateUpdated: string;
  isFeatured?: boolean;
  featuredRequestStatus?: 'none' | 'pending' | 'approved' | 'rejected';
  featuredRequestDate?: string;
}
