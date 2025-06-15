import { useState } from "react";
import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [searchData, setSearchData] = useState({
    location: "",
    propertyType: "",
    bedrooms: "",
    priceRange: ""
  });

  const navigate = useNavigate();

  const handleSearch = () => {
    const params = new URLSearchParams();
    
    if (searchData.location) params.append('location', searchData.location);
    if (searchData.propertyType) params.append('type', searchData.propertyType);
    if (searchData.bedrooms) params.append('bedrooms', searchData.bedrooms);
    if (searchData.priceRange) params.append('price', searchData.priceRange);
    
    navigate(`/find-rentals?${params.toString()}`);
  };

  return (
    <section className="relative bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-secondary-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-poppins font-bold text-neutral-900 mb-6 leading-tight">
            Find Your Perfect
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent"> Rental Home</span>
          </h1>
          <p className="text-xl text-neutral-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Connect with verified landlords and agents. Discover thousands of quality rental properties 
            in your desired location with our smart matching system.
          </p>

          {/* Search Form */}
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-5xl mx-auto border border-neutral-100">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Location */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-neutral-700 mb-2">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
                  <Input
                    placeholder="City, neighborhood, or ZIP code"
                    value={searchData.location}
                    onChange={(e) => setSearchData({...searchData, location: e.target.value})}
                    className="pl-10 border-neutral-200 focus:border-primary-500"
                  />
                </div>
              </div>

              {/* Property Type */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Property Type</label>
                <Select value={searchData.propertyType} onValueChange={(value) => setSearchData({...searchData, propertyType: value})}>
                  <SelectTrigger className="border-neutral-200 focus:border-primary-500">
                    <SelectValue placeholder="Any Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="studio">Studio</SelectItem>
                    <SelectItem value="shared">Shared</SelectItem>
                    <SelectItem value="shortlet">Shortlet</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Bedrooms */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Bedrooms</label>
                <Select value={searchData.bedrooms} onValueChange={(value) => setSearchData({...searchData, bedrooms: value})}>
                  <SelectTrigger className="border-neutral-200 focus:border-primary-500">
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="studio">Studio</SelectItem>
                    <SelectItem value="1">1 Bedroom</SelectItem>
                    <SelectItem value="2">2 Bedrooms</SelectItem>
                    <SelectItem value="3">3 Bedrooms</SelectItem>
                    <SelectItem value="4+">4+ Bedrooms</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Search Button */}
              <div className="flex items-end">
                <Button 
                  onClick={handleSearch}
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Start Your Search
                </Button>
              </div>
            </div>
          </div>

          {/* List Property and List Shortlet buttons */}
          <div className="flex flex-wrap gap-4 mt-6 justify-center">
            <Button
              onClick={() => navigate("/list-property")}
              className="bg-primary-500 hover:bg-primary-600 text-white"
            >
              List Your Property
            </Button>
            <Button
              onClick={() => navigate("/list-property?type=shortlet")}
              className="bg-secondary-500 hover:bg-secondary-600 text-white"
            >
              List Shortlet Apartment
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-12 text-center">
            <div className="animate-fade-in">
              <div className="text-2xl font-bold text-primary-600">50K+</div>
              <div className="text-neutral-600">Active Listings</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="text-2xl font-bold text-primary-600">25K+</div>
              <div className="text-neutral-600">Happy Tenants</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-2xl font-bold text-primary-600">5K+</div>
              <div className="text-neutral-600">Verified Landlords</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="text-2xl font-bold text-primary-600">1M+</div>
              <div className="text-neutral-600">Successful Matches</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
