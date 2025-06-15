
import { Property } from "@/types/property";

interface PropertyImagesProps {
  property: Property;
}

const PropertyImages = ({ property }: PropertyImagesProps) => {
  return (
    <div className="mb-8">
      <div className="aspect-video bg-gray-200 rounded-lg mb-4">
        {property.images && property.images.length > 0 ? (
          <img 
            src={property.images[0]} 
            alt={property.title}
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            No image available
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyImages;
