import { useParams, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Property } from "@/types/property";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Bed, Bath, Square, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PropertyMap from "@/components/PropertyMap";
import { useToast } from "@/hooks/use-toast";

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  const showTourDialog = searchParams.get('tour') === 'true';

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) return;
      
      try {
        console.log('Fetching property with ID:', id);
        const propertyRef = doc(db, 'properties', id);
        const propertySnap = await getDoc(propertyRef);
        
        if (propertySnap.exists()) {
          const propertyData = { id: propertySnap.id, ...propertySnap.data() } as Property;
          console.log('Property response:', propertyData);
          setProperty(propertyData);
        } else {
          console.log('Property not found');
          setProperty(null);
        }
      } catch (error) {
        console.error('Error fetching property:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const handleApplyNow = () => {
    navigate(`/apply/${id}`);
  };

  const handleScheduleTour = () => {
    toast({
      title: "Tour Request Submitted",
      description: "We'll contact you soon to schedule your property tour.",
    });
  };

  const handleContactAgent = () => {
    toast({
      title: "Contact Request Sent",
      description: "An agent will reach out to you within 24 hours.",
    });
  };

  const handleSaveProperty = () => {
    toast({
      title: "Property Saved",
      description: "This property has been added to your favorites.",
    });
  };

  // Show tour scheduling notification if tour parameter is present
  useEffect(() => {
    if (showTourDialog && property) {
      toast({
        title: "Schedule a Tour",
        description: `Click "Schedule Tour" to book a viewing for ${property.title}`,
      });
    }
  }, [showTourDialog, property, toast]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Property not found</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Property Images */}
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Property Details */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <h1 className="text-3xl font-bold mb-4">{property.title}</h1>
                  
                  <div className="flex items-center gap-2 mb-6 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{property.address}, {property.city}, {property.state}</span>
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
                      <span>{property.area} sq ft</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-3">Description</h2>
                    <p className="text-gray-700 leading-relaxed">{property.description}</p>
                  </div>

                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-3">Location</h2>
                    <PropertyMap address={`${property.address}, ${property.city}, ${property.state}`} />
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>Listed on {new Date(property.dateAdded).toLocaleDateString()}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div>
              <Card className="sticky top-4">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-primary-600 mb-4">
                    ${property.price.toLocaleString()}/month
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <Button className="w-full" size="lg" onClick={handleApplyNow}>
                      Apply Now
                    </Button>
                    <Button variant="outline" className="w-full" size="lg" onClick={handleContactAgent}>
                      Contact Agent
                    </Button>
                    <Button variant="outline" className="w-full" size="lg" onClick={handleScheduleTour}>
                      Schedule Tour
                    </Button>
                    <Button variant="outline" className="w-full" size="lg" onClick={handleSaveProperty}>
                      Save Property
                    </Button>
                  </div>

                  <div className="text-sm text-gray-600">
                    <p>Property Type: <span className="capitalize">{property.propertyType}</span></p>
                    <p>Status: <span className="capitalize">{property.status}</span></p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PropertyDetail;
