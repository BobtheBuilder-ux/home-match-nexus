
import { useState } from "react";
import { Search, Filter, MapPin, Bed, Bath, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";

const FindRentals = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

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
              <Button size="lg" className="bg-secondary-600 hover:bg-secondary-700">
                Search
              </Button>
            </div>

            {showFilters && (
              <div className="bg-white rounded-lg p-6 text-neutral-900">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Price Range</label>
                    <select className="w-full p-2 border rounded-lg">
                      <option>Any Price</option>
                      <option>$1000 - $2000</option>
                      <option>$2000 - $3000</option>
                      <option>$3000+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Bedrooms</label>
                    <select className="w-full p-2 border rounded-lg">
                      <option>Any</option>
                      <option>Studio</option>
                      <option>1 Bedroom</option>
                      <option>2+ Bedrooms</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Property Type</label>
                    <select className="w-full p-2 border rounded-lg">
                      <option>Any Type</option>
                      <option>Apartment</option>
                      <option>House</option>
                      <option>Studio</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Amenities</label>
                    <select className="w-full p-2 border rounded-lg">
                      <option>Any Amenities</option>
                      <option>Pet Friendly</option>
                      <option>Parking</option>
                      <option>Gym</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900">Available Properties</h2>
            <p className="text-neutral-600">{properties.length} properties found</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <MapPin className="w-4 h-4 mr-2" />
              Map View
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg">Load More Properties</Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FindRentals;
