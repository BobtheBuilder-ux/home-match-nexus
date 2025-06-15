import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchHeader from "@/components/SearchHeader";
import SearchFilters from "@/components/SearchFilters";
import PropertyList from "@/components/PropertyList";
import { usePropertyFilters } from "@/hooks/usePropertyFilters";
import { getProperties } from "@/services/propertyService";
import { Property } from "@/types/property";

const FindRentals = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchLocation, setSearchLocation] = useState("");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const navigate = useNavigate();
  const location = useLocation();

  const [filters, setFilters] = useState({
    location: "",
    type: "any",
    bedrooms: "any",
    priceMin: 0,
    priceMax: 10000000,
    amenities: [] as string[],
    sortBy: "newest"
  });

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const allProperties = await getProperties();
        // Filter only available properties
        const availableProperties = allProperties.filter(p => p.status === 'available');
        setProperties(availableProperties);
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const locationParam = urlParams.get('location');
    if (locationParam) {
      setSearchLocation(locationParam);
      setFilters(prev => ({ ...prev, location: locationParam }));
    }
  }, [location.search]);

  const filteredProperties = usePropertyFilters(properties, filters);

  const handleSearch = (location: string) => {
    setSearchLocation(location);
    setFilters(prev => ({ ...prev, location }));
    
    if (location.trim()) {
      navigate(`/find-rentals?location=${encodeURIComponent(location)}`);
    } else {
      navigate('/find-rentals');
    }
  };

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      location: "",
      type: "any",
      bedrooms: "any",
      priceMin: 0,
      priceMax: 10000000,
      amenities: [],
      sortBy: "newest"
    });
    setSearchLocation("");
    navigate('/find-rentals');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-neutral-600">Finding perfect homes for you...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <SearchHeader 
        searchLocation={searchLocation}
        onSearch={handleSearch}
        resultsCount={filteredProperties.length}
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <SearchFilters 
              filters={filters}
              onFiltersChange={handleFilterChange}
              onClearFilters={handleClearFilters}
            />
          </div>
          
          <div className="lg:w-3/4">
            <PropertyList 
              properties={filteredProperties}
              viewMode={viewMode}
              setViewMode={setViewMode}
              searchLocation={searchLocation}
            />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default FindRentals;
