
import { useState } from "react";
import { Button } from "@/components/ui/button";
import PropertyDetailsForm from "./PropertyDetailsForm";
import ImageUploadSection from "./ImageUploadSection";

const PropertyForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    address: "",
    city: "",
    state: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    propertyType: "apartment"
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-poppins font-bold mb-6">Property Details</h2>
      
      <form className="space-y-6">
        <PropertyDetailsForm formData={formData} onInputChange={handleInputChange} />
        
        <ImageUploadSection />

        <div className="flex gap-4 pt-6">
          <Button size="lg" className="flex-1">
            Publish Property
          </Button>
          <Button variant="outline" size="lg">
            Save as Draft
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PropertyForm;
