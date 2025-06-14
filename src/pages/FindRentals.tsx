
import { useState, useEffect } from "react";
import { Search, Filter, MapPin, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import SearchFilters from "@/components/SearchFilters";

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

  // Mock properties data - in real app this would be filtered based on search params
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

  // Enhanced filtering logic
  const filteredProperties = properties.filter(property => {
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
  const sortedProperties = [...filteredProperties].sort((a, b) => {
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
      
      <div className="bg-primary-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-poppins font-bold mb-4">Find Your Perfect Rental</h1>
          <p className="text-xl mb-8">Discover amazing properties that match your lifestyle</p>
          
          <div className="max-w-4xl">
            <div className="flex gap-4 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                <Input
                  placeholder="Search by city, neighborhood, or address..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 text-lg"
                />
              </div>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setShowFilters(!showFilters)}
                className="bg-white text-primary-600 border-white hover:bg-neutral-100"
              >
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </Button>
              <Button size="lg" className="bg-secondary-600 hover:bg-secondary-700" onClick={handleSearch}>
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="lg:col-span-1">
              <SearchFilters
                filters={filters}
                onFiltersChange={setFilters}
                onClearFilters={handleClearFilters}
              />
            </div>
          )}

          {/* Main Content */}
          <div className={showFilters ? "lg:col-span-3" : "lg:col-span-4"}>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-neutral-900">Available Properties</h2>
                <p className="text-neutral-600">
                  {sortedProperties.length} properties found
                  {filters.location && ` for "${filters.location}"`}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <MapPin className="w-4 h-4 mr-2" />
                  Map View
                </Button>
              </div>
            </div>

            <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'grid-cols-1 gap-4'}`}>
              {sortedProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>

            {sortedProperties.length === 0 && (
              <div className="text-center py-12">
                <p className="text-neutral-600 text-lg">No properties found matching your criteria.</p>
                <p className="text-neutral-500">Try adjusting your search filters.</p>
              </div>
            )}

            <div className="text-center mt-12">
              <Button size="lg">Load More Properties</Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FindRentals;
