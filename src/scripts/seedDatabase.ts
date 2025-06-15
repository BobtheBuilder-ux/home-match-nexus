import { supabase } from '@/integrations/supabase/client';
import { generateProperties } from './utils/propertyGenerator';

export const seedDatabase = async () => {
  try {
    console.log('Starting database seeding with Supabase...');
    
    // Generate sample properties
    const sampleProperties = generateProperties(55);
    
    // Insert properties into Supabase
    const { data, error } = await supabase
      .from('properties')
      .insert(sampleProperties.map(property => ({
        title: property.title,
        description: property.description,
        location: `${property.address}, ${property.city}, ${property.state}`,
        price: property.price,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        size_sqft: property.area,
        property_type: property.propertyType,
        status: property.status === 'active' ? 'available' : property.status === 'rented' ? 'rented' : 'available',
        images: property.images,
        amenities: [],
        agent_id: property.agentId,
        is_featured: property.isFeatured || false
      })))
      .select();

    if (error) {
      console.error('Error seeding properties:', error);
      throw error;
    }

    console.log('✅ Database seeding completed successfully with Supabase!');
    console.log(`Created ${data?.length || 0} properties in Abuja, Nigeria`);
    console.log('💰 All prices are in Nigerian Naira (₦)');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
};

export const clearDatabase = async () => {
  try {
    console.log('⚠️  Clearing Supabase database...');
    
    const tables = ['payments', 'featured_requests', 'applications', 'properties'];

    for (const tableName of tables) {
      const { error } = await supabase.from(tableName).delete().neq('id', '00000000-0000-0000-0000-000000000000');
      if (error) {
        console.error(`Error clearing ${tableName}:`, error);
      } else {
        console.log(`Cleared ${tableName} table`);
      }
    }
    
    console.log('✅ Supabase database cleared successfully!');
  } catch (error) {
    console.error('❌ Error clearing Supabase database:', error);
    throw error;
  }
};
