
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { addProperty } from "@/services/propertyService";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PropertyDetailsForm from "./PropertyDetailsForm";
import ImageUploadSection from "./ImageUploadSection";
import VideoUploadSection from "./VideoUploadSection";

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
    propertyType: "apartment" as 'apartment' | 'house' | 'studio' | 'shared'
  });
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [videoFiles, setVideoFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent, isDraft = false) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Please sign in to list a property");
      return;
    }

    setLoading(true);

    // In a real app, you would upload files to a storage service (like Firebase Storage)
    // and get back the URLs before saving the property data.
    console.log("Selected image files:", imageFiles);
    console.log("Selected video files:", videoFiles);
    
    try {
      const propertyData = {
        ...formData,
        price: parseFloat(formData.price) || 0,
        bedrooms: parseInt(formData.bedrooms) || 0,
        bathrooms: parseFloat(formData.bathrooms) || 0,
        area: parseInt(formData.area) || 0,
        status: (isDraft ? 'draft' : 'active') as 'active' | 'draft' | 'rented',
        images: [], // Placeholder for uploaded image URLs
        videos: [], // Placeholder for uploaded video URLs
        agentId: user.uid,
        dateAdded: new Date().toISOString(),
        dateUpdated: new Date().toISOString()
      };

      await addProperty(propertyData);
      toast.success(isDraft ? "Property saved as draft" : "Property published successfully!");
      navigate('/agent-dashboard');
    } catch (error) {
      console.error('Error saving property:', error);
      toast.error("Failed to save property. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-poppins font-bold mb-6">Property Details</h2>
      
      <form className="space-y-6">
        <PropertyDetailsForm formData={formData} onInputChange={handleInputChange} />
        
        <div className="space-y-6">
          <ImageUploadSection onFilesSelect={setImageFiles} disabled={loading} />
          <VideoUploadSection onFilesSelect={setVideoFiles} disabled={loading} />
        </div>

        <div className="flex gap-4 pt-6">
          <Button 
            size="lg" 
            className="flex-1"
            onClick={(e) => handleSubmit(e, false)}
            disabled={loading}
          >
            {loading ? "Publishing..." : "Publish Property"}
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={(e) => handleSubmit(e, true)}
            disabled={loading}
          >
            Save as Draft
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PropertyForm;
