
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Heart } from "lucide-react";

interface SavePropertyButtonProps {
  propertyId: string;
  propertyTitle: string;
}

const SavePropertyButton = ({ propertyId, propertyTitle }: SavePropertyButtonProps) => {
  const [isSaved, setIsSaved] = useState(false);
  const { toast } = useToast();

  const handleSaveProperty = async () => {
    // Here you would typically save/unsave the property to user's favorites
    console.log('Save property:', { propertyId, propertyTitle });
    
    setIsSaved(!isSaved);
    
    toast({
      title: isSaved ? "Property Removed" : "Property Saved",
      description: isSaved 
        ? "This property has been removed from your favorites."
        : "This property has been added to your favorites.",
    });
  };

  return (
    <Button 
      variant="outline" 
      className="w-full" 
      size="lg" 
      onClick={handleSaveProperty}
    >
      <Heart className={`w-4 h-4 mr-2 ${isSaved ? 'fill-current text-red-500' : ''}`} />
      {isSaved ? 'Saved' : 'Save Property'}
    </Button>
  );
};

export default SavePropertyButton;
