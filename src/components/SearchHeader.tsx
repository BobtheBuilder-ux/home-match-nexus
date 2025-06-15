import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
interface SearchHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  onSearch: () => void;
}
const SearchHeader = ({
  searchQuery,
  setSearchQuery,
  showFilters,
  setShowFilters,
  onSearch
}: SearchHeaderProps) => {
  return <div className="bg-primary-600 text-white py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-poppins font-bold mb-4">Find Your Perfect Rental</h1>
        <p className="text-xl mb-8">Discover amazing properties that match your lifestyle</p>
        
        <div className="max-w-4xl">
          <div className="flex gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
              <Input placeholder="Search by city, neighborhood, or address..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-12 h-12 text-lg text-black " />
            </div>
            <Button variant="outline" size="lg" onClick={() => setShowFilters(!showFilters)} className="bg-white text-primary-600 border-white hover:bg-neutral-100">
              <Filter className="w-5 h-5 mr-2" />
              Filters
            </Button>
            <Button size="lg" className="bg-secondary-600 hover:bg-secondary-700" onClick={onSearch}>
              Search
            </Button>
          </div>
        </div>
      </div>
    </div>;
};
export default SearchHeader;