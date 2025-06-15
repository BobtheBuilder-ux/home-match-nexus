
import { supabase } from '@/integrations/supabase/client';

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

export const addProperty = async (propertyData: Omit<Property, 'id' | 'created_at' | 'updated_at'>) => {
  try {
    const { data, error } = await supabase
      .from('properties')
      .insert([{
        title: propertyData.title,
        description: propertyData.description,
        location: propertyData.location,
        price: propertyData.price,
        bedrooms: propertyData.bedrooms,
        bathrooms: propertyData.bathrooms,
        size_sqft: propertyData.size_sqft,
        property_type: propertyData.property_type,
        status: propertyData.status,
        images: propertyData.images,
        amenities: propertyData.amenities,
        agent_id: propertyData.agent_id,
        is_featured: propertyData.is_featured
      }])
      .select()
      .single();

    if (error) throw error;
    return data.id;
  } catch (error) {
    console.error('Error adding property:', error);
    throw error;
  }
};

export const getProperties = async (filters?: { city?: string; maxPrice?: number; minBedrooms?: number }) => {
  try {
    console.log('🔌 Connecting to Supabase to fetch properties...');
    
    let query = supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false });

    // Remove the status filter to get all properties initially
    console.log('📊 Query filters:', filters);

    if (filters?.city) {
      query = query.ilike('location', `%${filters.city}%`);
    }
    
    if (filters?.maxPrice) {
      query = query.lte('price', filters.maxPrice);
    }
    
    if (filters?.minBedrooms) {
      query = query.gte('bedrooms', filters.minBedrooms);
    }

    const { data, error } = await query;

    if (error) {
      console.error('❌ Supabase query error:', error);
      throw error;
    }
    
    console.log('✅ Successfully fetched properties:', data?.length || 0);
    console.log('📋 First property sample:', data?.[0]);
    
    return data as Property[];
  } catch (error) {
    console.error('❌ Error in getProperties:', error);
    throw error;
  }
};

export const getPropertiesByAgent = async (agentId: string) => {
  try {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('agent_id', agentId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Property[];
  } catch (error) {
    console.error('Error getting agent properties:', error);
    throw error;
  }
};

export const updateProperty = async (propertyId: string, updates: Partial<Property>) => {
  try {
    const { error } = await supabase
      .from('properties')
      .update(updates)
      .eq('id', propertyId);

    if (error) throw error;
  } catch (error) {
    console.error('Error updating property:', error);
    throw error;
  }
};

export const deleteProperty = async (propertyId: string) => {
  try {
    const { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', propertyId);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting property:', error);
    throw error;
  }
};

export const getFeaturedProperties = async () => {
  try {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('is_featured', true)
      .eq('status', 'available')
      .order('created_at', { ascending: false })
      .limit(6);

    if (error) throw error;
    return data as Property[];
  } catch (error) {
    console.error('Error getting featured properties:', error);
    throw error;
  }
};
