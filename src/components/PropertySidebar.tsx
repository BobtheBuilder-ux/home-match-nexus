
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Property } from "@/types/property";
import { useNavigate } from "react-router-dom";
import ContactAgentDialog from "./ContactAgentDialog";
import ScheduleTourDialog from "./ScheduleTourDialog";
import SavePropertyButton from "./SavePropertyButton";

interface PropertySidebarProps {
  property: Property;
}

const PropertySidebar = ({ property }: PropertySidebarProps) => {
  const navigate = useNavigate();

  const handleApplyNow = () => {
    navigate(`/apply/${property.id}`);
  };

  // Pricing label
  let pricingUnit = "per year";
  if (property.propertyType === "shortlet") {
    pricingUnit = "per night";
  }

  return (
    <Card className="sticky top-4">
      <CardContent className="p-6">
        <div className="text-3xl font-bold text-primary-600 mb-4">
          ₦{property.price.toLocaleString()}/{pricingUnit}
        </div>
        
        <div className="space-y-3 mb-6">
          <Button className="w-full" size="lg" onClick={handleApplyNow}>
            Apply Now
          </Button>
          <ContactAgentDialog 
            propertyId={property.id} 
            propertyTitle={property.title} 
          />
          <ScheduleTourDialog 
            propertyId={property.id} 
            propertyTitle={property.title} 
          />
          <SavePropertyButton 
            propertyId={property.id} 
            propertyTitle={property.title} 
          />
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
