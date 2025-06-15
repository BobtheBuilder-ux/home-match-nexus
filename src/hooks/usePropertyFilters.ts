
import { useMemo } from "react";
import { Property } from "@/types/property";

interface Filters {
  location: string;
  type: string;
  bedrooms: string;
  priceMin: number;
  priceMax: number;
  amenities: string[];
  sortBy: string;
}

export const usePropertyFilters = (properties: Property[], filters: Filters) => {
  const filteredAndSortedProperties = useMemo(() => {
    console.log('Filtering properties:', properties.length, 'with filters:', filters);
    
    // Filter properties
    const filtered = properties.filter(property => {
      // Location filter - more flexible matching
      if (filters.location && filters.location.trim()) {
        const searchTerm = filters.location.toLowerCase().trim();
        const locationMatch = 
          property.city.toLowerCase().includes(searchTerm) ||
          property.state.toLowerCase().includes(searchTerm) ||
          property.address.toLowerCase().includes(searchTerm) ||
          // Also check for partial matches and common variations
          searchTerm.includes(property.city.toLowerCase()) ||
          searchTerm.includes(property.state.toLowerCase());
        
        console.log(`Checking location "${searchTerm}" against property: ${property.city}, ${property.state}, ${property.address}. Match: ${locationMatch}`);
        
        if (!locationMatch) return false;
      }
      
      // Property type filter
      if (filters.type && filters.type !== 'any') {
        if (property.propertyType !== filters.type) return false;
      }
      
      // Bedrooms filter
      if (filters.bedrooms && filters.bedrooms !== 'any') {
        if (filters.bedrooms === 'studio') {
          if (property.bedrooms !== 0) return false;
        } else if (filters.bedrooms === '4+') {
          if (property.bedrooms < 4) return false;
        } else {
          const bedroomCount = parseInt(filters.bedrooms);
          if (property.bedrooms !== bedroomCount) return false;
        }
      }
      
      // Price filter
      if (property.price < filters.priceMin || property.price > filters.priceMax) {
        return false;
      }
      
      return true;
    });

    console.log('Filtered properties:', filtered.length);

    // Sort properties
    const sorted = [...filtered].sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'size':
          return b.area - a.area;
        case 'newest':
          return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
        default:
          return 0;
      }
    });

    return sorted;
  }, [properties, filters]);

  return filteredAndSortedProperties;
};
