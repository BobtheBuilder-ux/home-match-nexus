
import { useState } from "react";
import { MapPin, Bed, Bath, Maximize, Heart, Share2, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Property } from "@/types/property";

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  // Create location string from address components
  const location = `${property.city}, ${property.state}`;

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-neutral-100">
      {/* Image Carousel */}
      <div className="relative h-56 overflow-hidden group">
        {property.images && property.images.length > 0 ? (
          <img
            src={property.images[currentImageIndex]}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
            No image available
          </div>
        )}
        
        {/* Image Navigation */}
        {property.images && property.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            {/* Image Dots */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
              {property.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {property.status === 'active' && new Date(property.dateAdded) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) && (
            <Badge className="bg-success text-white">New</Badge>
          )}
          {property.isFeatured && (
            <Badge className="bg-primary-600 text-white">Featured</Badge>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <Button
            size="sm"
            variant="ghost"
            className={`bg-white/80 hover:bg-white p-2 rounded-full ${
              isFavorited ? 'text-red-500' : 'text-neutral-600'
            }`}
            onClick={() => setIsFavorited(!isFavorited)}
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="bg-white/80 hover:bg-white p-2 rounded-full text-neutral-600"
          >
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Property Details */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-neutral-900 line-clamp-2 flex-1">
            {property.title}
          </h3>
          <div className="text-right ml-3">
            <div className="text-2xl font-bold text-primary-600">${property.price.toLocaleString()}</div>
            <div className="text-sm text-neutral-500">per month</div>
          </div>
        </div>

        <div className="flex items-center text-neutral-600 mb-3">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">{location}</span>
        </div>

        {/* Property Specs */}
        <div className="flex items-center gap-4 mb-4 text-neutral-600">
          <div className="flex items-center">
            <Bed className="w-4 h-4 mr-1" />
            <span className="text-sm">{property.bedrooms} bed</span>
          </div>
          <div className="flex items-center">
            <Bath className="w-4 h-4 mr-1" />
            <span className="text-sm">{property.bathrooms} bath</span>
          </div>
          <div className="flex items-center">
            <Maximize className="w-4 h-4 mr-1" />
            <span className="text-sm">{property.area} sqft</span>
          </div>
        </div>

        {/* Property Type Badge */}
        <div className="flex flex-wrap gap-1 mb-4">
          <Badge variant="secondary" className="text-xs bg-neutral-100 text-neutral-700 capitalize">
            {property.propertyType}
          </Badge>
          {property.status === 'active' && (
            <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
              Available
            </Badge>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Link to={`/property/${property.id}`} className="flex-1">
            <Button className="w-full bg-primary-600 hover:bg-primary-700 text-white">
              View Details
            </Button>
          </Link>
          <Link to={`/property/${property.id}?tour=true`}>
            <Button variant="outline" className="border-primary-600 text-primary-600 hover:bg-primary-50">
              <Calendar className="w-4 h-4 mr-1" />
              Tour
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
