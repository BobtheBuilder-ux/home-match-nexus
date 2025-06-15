
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
      // Location filter
      if (filters.location) {
        const locationMatch = 
          property.city.toLowerCase().includes(filters.location.toLowerCase()) ||
          property.state.toLowerCase().includes(filters.location.toLowerCase()) ||
          property.address.toLowerCase().includes(filters.location.toLowerCase());
        if (!locationMatch) return false;
      }
      
      // Property type filter
      if (filters.type && filters.type !== 'any') {
        if (property.propertyType !== filters.type) return false;
      }
      
      // Bedrooms filter
      if (filters.bedrooms && filters.bedrooms !== 'any') {
        if (filters.bedrooms === 'studio' && property.bedrooms !== 0) {
          return false;
        } else if (filters.bedrooms !== 'studio' && property.bedrooms !== parseInt(filters.bedrooms)) {
          return false;
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
