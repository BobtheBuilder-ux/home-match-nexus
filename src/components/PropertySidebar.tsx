
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Property } from "@/types/property";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface PropertySidebarProps {
  property: Property;
}

const PropertySidebar = ({ property }: PropertySidebarProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleApplyNow = () => {
    navigate(`/apply/${property.id}`);
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

  return (
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
  );
};

export default PropertySidebar;
