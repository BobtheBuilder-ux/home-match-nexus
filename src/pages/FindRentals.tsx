
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchFilters from "@/components/SearchFilters";
import SearchHeader from "@/components/SearchHeader";
import PropertyList from "@/components/PropertyList";
import { usePropertyFilters } from "@/hooks/usePropertyFilters";
import { getProperties } from "@/services/propertyService";
import { Property } from "@/types/property";

const FindRentals = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    location: "",
    type: "any",
    bedrooms: "any",
    priceMin: 500,
    priceMax: 5000,
    amenities: [] as string[],
    sortBy: "relevance"
  });

  // Initialize filters from URL parameters
  useEffect(() => {
    const location = searchParams.get('location') || searchParams.get('search') || "";
    const type = searchParams.get('type') || "any";
    const bedrooms = searchParams.get('bedrooms') || "any";
    
    setSearchQuery(location);
    setFilters(prev => ({ 
      ...prev, 
      location, 
      type, 
      bedrooms 
    }));
  }, [searchParams]);

  // Fetch properties from Firebase
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        console.log('Fetching properties from Firebase...');
        const fetchedProperties = await getProperties();
        console.log('Fetched properties:', fetchedProperties);
        // Only show active properties
        const activeProperties = fetchedProperties.filter(property => property.status === 'active');
        setProperties(activeProperties);
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const filteredProperties = usePropertyFilters(properties, filters);

  const handleSearch = () => {
    console.log("Searching with query:", searchQuery);
    setFilters(prev => ({ ...prev, location: searchQuery }));
  };

  const handleClearFilters = () => {
    setFilters({
      location: "",
      type: "any",
      bedrooms: "any",
      priceMin: 500,
      priceMax: 5000,
      amenities: [],
      sortBy: "relevance"
    });
    setSearchQuery("");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading properties...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <SearchHeader 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        onSearch={handleSearch}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {showFilters && (
            <div className="lg:col-span-1">
              <SearchFilters
                filters={filters}
                onFiltersChange={setFilters}
                onClearFilters={handleClearFilters}
              />
            </div>
          )}

          <div className={showFilters ? "lg:col-span-3" : "lg:col-span-4"}>
            <PropertyList 
              properties={filteredProperties}
              viewMode={viewMode}
              setViewMode={setViewMode}
              searchLocation={filters.location}
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FindRentals;
