
import { Grid, List, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import PropertyCard from "@/components/PropertyCard";

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

interface PropertyListProps {
  properties: Property[];
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  searchLocation: string;
}

const PropertyList = ({ properties, viewMode, setViewMode, searchLocation }: PropertyListProps) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900">Available Properties</h2>
          <p className="text-neutral-600">
            {properties.length} properties found
            {searchLocation && ` for "${searchLocation}"`}
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
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>

      {properties.length === 0 && (
        <div className="text-center py-12">
          <p className="text-neutral-600 text-lg">No properties found matching your criteria.</p>
          <p className="text-neutral-500">Try adjusting your search filters.</p>
        </div>
      )}

      <div className="text-center mt-12">
        <Button size="lg">Load More Properties</Button>
      </div>
    </div>
  );
};

export default PropertyList;
