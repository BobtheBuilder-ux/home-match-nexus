
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
        
        if (!locationMatch) {
          console.log(`Location filter failed for: ${property.city}, ${property.state}`);
          return false;
        }
      }
      
      // Property type filter
      if (filters.type && filters.type !== 'any') {
        if (property.propertyType !== filters.type) {
          console.log(`Type filter failed for property: ${property.id}, expected: ${filters.type}, actual: ${property.propertyType}`);
          return false;
        }
      }
      
      // Bedrooms filter
      if (filters.bedrooms && filters.bedrooms !== 'any') {
        if (filters.bedrooms === 'studio') {
          if (property.bedrooms !== 0) {
            console.log(`Bedroom filter failed for property: ${property.id}, expected: studio (0), actual: ${property.bedrooms}`);
            return false;
          }
        } else if (filters.bedrooms === '4+') {
          if (property.bedrooms < 4) {
            console.log(`Bedroom filter failed for property: ${property.id}, expected: 4+, actual: ${property.bedrooms}`);
            return false;
          }
        } else {
          const bedroomCount = parseInt(filters.bedrooms);
          if (property.bedrooms !== bedroomCount) {
            console.log(`Bedroom filter failed for property: ${property.id}, expected: ${bedroomCount}, actual: ${property.bedrooms}`);
            return false;
          }
        }
      }
      
      // Price filter
      if (property.price < filters.priceMin || property.price > filters.priceMax) {
        console.log(`Price filter failed for property: ${property.id}, price: ${property.price}, range: ${filters.priceMin}-${filters.priceMax}`);
        return false;
      }
      
      console.log(`Property ${property.id} passed all filters`);
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
