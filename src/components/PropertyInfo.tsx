
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Bed, Bath, Square, Calendar } from "lucide-react";
import { Property } from "@/types/property";
import PropertyMap from "@/components/PropertyMap";

interface PropertyInfoProps {
  property: Property;
}

const PropertyInfo = ({ property }: PropertyInfoProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h1 className="text-3xl font-bold mb-4">{property.title}</h1>
        
        <div className="flex items-center gap-2 mb-6 text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>{property.location}</span>
        </div>

        <div className="flex gap-6 mb-6">
          <div className="flex items-center gap-2">
            <Bed className="w-4 h-4 text-gray-500" />
            <span>{property.bedrooms} bed</span>
          </div>
          <div className="flex items-center gap-2">
            <Bath className="w-4 h-4 text-gray-500" />
            <span>{property.bathrooms} bath</span>
          </div>
          <div className="flex items-center gap-2">
            <Square className="w-4 h-4 text-gray-500" />
            <span>{property.size_sqft} sq ft</span>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Description</h2>
          <p className="text-gray-700 leading-relaxed">{property.description}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Location</h2>
          <PropertyMap address={property.location} />
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Calendar className="w-4 h-4" />
          <span>Listed on {new Date(property.created_at).toLocaleDateString()}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyInfo;
