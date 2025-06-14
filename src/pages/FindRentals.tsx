
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchFilters from "@/components/SearchFilters";
import SearchHeader from "@/components/SearchHeader";
import PropertyList from "@/components/PropertyList";
import { usePropertyFilters } from "@/hooks/usePropertyFilters";

const FindRentals = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState({
    location: "",
    type: "",
    bedrooms: "",
    priceMin: 500,
    priceMax: 5000,
    amenities: [] as string[],
    sortBy: "relevance"
  });

  // Initialize filters from URL parameters
  useEffect(() => {
    const location = searchParams.get('location') || searchParams.get('search') || "";
    const type = searchParams.get('type') || "";
    const bedrooms = searchParams.get('bedrooms') || "";
    
    setSearchQuery(location);
    setFilters(prev => ({ 
      ...prev, 
      location, 
      type, 
      bedrooms 
    }));
  }, [searchParams]);

  // Mock properties data
  const properties = [
    {
      id: "1",
      title: "Modern Downtown Apartment",
      location: "Downtown, Seattle, WA",
      price: 2800,
      bedrooms: 2,
      bathrooms: 2,
      area: 1200,
      images: ["https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop"],
      amenities: ["Gym", "Pool", "Parking"],
      isNew: true
    },
    {
      id: "2",
      title: "Cozy Studio Apartment",
      location: "Capitol Hill, Denver, CO",
      price: 1800,
      bedrooms: 0,
      bathrooms: 1,
      area: 500,
      images: ["https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop"],
      amenities: ["WiFi", "Laundry"]
    }
  ];

  const filteredProperties = usePropertyFilters(properties, filters);

  const handleSearch = () => {
    console.log("Searching with query:", searchQuery);
    setFilters(prev => ({ ...prev, location: searchQuery }));
  };

  const handleClearFilters = () => {
    setFilters({
      location: "",
      type: "",
      bedrooms: "",
      priceMin: 500,
      priceMax: 5000,
      amenities: [],
      sortBy: "relevance"
    });
    setSearchQuery("");
  };

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
