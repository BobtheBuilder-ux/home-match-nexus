
import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchHeaderProps {
  searchLocation: string;
  onSearch: (location: string) => void;
  resultsCount: number;
}

const SearchHeader = ({
  searchLocation,
  onSearch,
  resultsCount
}: SearchHeaderProps) => {
  const [localSearchQuery, setLocalSearchQuery] = useState(searchLocation);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(localSearchQuery);
  };

  return (
    <div className="bg-primary-600 text-white py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-poppins font-bold mb-4">Find Your Perfect Rental</h1>
        <p className="text-xl mb-8">Discover amazing properties that match your lifestyle</p>
        
        <div className="max-w-4xl">
          <form onSubmit={handleSubmit} className="flex gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
              <Input 
                placeholder="Search by city, neighborhood, or address..." 
                value={localSearchQuery} 
                onChange={(e) => setLocalSearchQuery(e.target.value)} 
                className="pl-12 h-12 text-lg text-black" 
              />
            </div>
            <Button 
              type="submit"
              size="lg" 
              className="bg-secondary-600 hover:bg-secondary-700"
            >
              Search
            </Button>
          </form>
          
          {resultsCount !== undefined && (
            <p className="text-white/80">
              {resultsCount} properties found
              {searchLocation && ` for "${searchLocation}"`}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchHeader;
