
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { requestFeaturedProperty } from "@/services/featuredPropertyService";
import { useAuth } from "@/contexts/AuthContext";

interface RequestFeaturedDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  propertyId: string;
  propertyTitle: string;
  currentStatus?: 'none' | 'pending' | 'approved' | 'rejected';
}

const RequestFeaturedDialog = ({ 
  open, 
  onOpenChange, 
  propertyId, 
  propertyTitle,
  currentStatus = 'none'
}: RequestFeaturedDialogProps) => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleRequest = async () => {
    if (!user) {
      toast.error("Please sign in to request featured status");
      return;
    }

    setLoading(true);
    try {
      await requestFeaturedProperty(propertyId, user.uid, propertyTitle);
      toast.success("Featured request submitted successfully! We'll review it within 24 hours.");
      onOpenChange(false);
    } catch (error) {
      console.error('Error requesting featured status:', error);
      toast.error("Failed to submit request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusMessage = () => {
    switch (currentStatus) {
      case 'pending':
        return "Your request is currently under review.";
      case 'approved':
        return "This property is already featured!";
      case 'rejected':
        return "Your previous request was declined. You can submit a new request.";
      default:
        return "Submit a request to have this property featured in our premium listings.";
    }
  };

  const canRequest = currentStatus === 'none' || currentStatus === 'rejected';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            Request Featured Status
          </DialogTitle>
          <DialogDescription>
            {propertyTitle}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <p className="text-sm text-gray-600 mb-4">
            {getStatusMessage()}
          </p>
          
          {canRequest && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Featured Benefits:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Priority placement in search results</li>
                <li>• Display in featured properties section</li>
                <li>• Increased visibility to potential tenants</li>
                <li>• Special "Featured" badge on your listing</li>
              </ul>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          {canRequest && (
            <Button onClick={handleRequest} disabled={loading}>
              {loading ? "Submitting..." : "Request Featured Status"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RequestFeaturedDialog;
