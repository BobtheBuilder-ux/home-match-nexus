
import { useMemo } from "react";

interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  images: string[];
  amenities: string[];
  isNew?: boolean;
}

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
    // Filter properties
    const filtered = properties.filter(property => {
      if (filters.location && !property.location.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }
      if (filters.bedrooms && filters.bedrooms !== 'studio' && property.bedrooms !== parseInt(filters.bedrooms)) {
        return false;
      }
      if (filters.bedrooms === 'studio' && property.bedrooms !== 0) {
        return false;
      }
      if (property.price < filters.priceMin || property.price > filters.priceMax) {
        return false;
      }
      if (filters.amenities.length > 0) {
        const hasAllAmenities = filters.amenities.every(amenity => 
          property.amenities.includes(amenity)
        );
        if (!hasAllAmenities) return false;
      }
      return true;
    });

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
          return b.isNew ? 1 : -1;
        default:
          return 0;
      }
    });

    return sorted;
  }, [properties, filters]);

  return filteredAndSortedProperties;
};
