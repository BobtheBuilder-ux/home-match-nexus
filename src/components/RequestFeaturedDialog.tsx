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
import { Star, CreditCard } from "lucide-react";
import { toast } from "sonner";
import { requestFeaturedProperty } from "@/services/featuredPropertyService";
import { useAuth } from "@/contexts/AuthContext";
import { 
  initializePaystackPayment, 
  createPaymentRecord, 
  generatePaymentReference,
  verifyPaymentWithWebhook
} from "@/services/paymentService";

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
  const [paymentStep, setPaymentStep] = useState<'request' | 'payment'>('request');
  const { user } = useAuth();

  const FEATURED_FEE = 2000; // 2,000 Naira

  const handlePayment = async () => {
    if (!user) {
      toast.error("Please sign in to continue");
      return;
    }

    setLoading(true);
    try {
      const reference = generatePaymentReference();
      
      // Create payment record first
      const paymentRecord = {
        propertyId,
        agentId: user.uid,
        propertyTitle,
        amount: FEATURED_FEE,
        currency: 'NGN',
        status: 'pending' as const,
        paystackReference: reference,
        transactionDate: new Date().toISOString()
      };

      const paymentId = await createPaymentRecord(paymentRecord);

      // Initialize Paystack payment
      await initializePaystackPayment(
        user.email || '',
        FEATURED_FEE,
        reference,
        {
          propertyId,
          propertyTitle,
          paymentId,
          agentId: user.uid
        }
      );

      console.log('Payment initiated, waiting for webhook verification...');
      
      // Wait for webhook verification
      const isVerified = await verifyPaymentWithWebhook(reference);
      
      if (isVerified) {
        // Create featured request after successful webhook verification
        await requestFeaturedProperty(propertyId, user.uid, propertyTitle, paymentId);
        toast.success("Payment verified! Your featured request has been submitted.");
        onOpenChange(false);
        setPaymentStep('request');
      } else {
        toast.error("Payment verification failed or timed out. Please contact support if payment was deducted.");
      }

    } catch (error) {
      console.error('Payment failed:', error);
      toast.error("Payment failed. Please try again.");
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
          
          {canRequest && paymentStep === 'request' && (
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Featured Benefits:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Priority placement in search results</li>
                  <li>• Display in featured properties section</li>
                  <li>• Increased visibility to potential tenants</li>
                  <li>• Special "Featured" badge on your listing</li>
                </ul>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CreditCard className="w-4 h-4 text-yellow-600" />
                  <h4 className="font-medium text-yellow-800">Payment Required</h4>
                </div>
                <p className="text-sm text-yellow-700">
                  Featured listing fee: <span className="font-bold">₦{FEATURED_FEE.toLocaleString()}</span>
                </p>
                <p className="text-xs text-yellow-600 mt-1">
                  Secure payment via Paystack • Webhook verified
                </p>
              </div>
            </div>
          )}
          
          {loading && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                {paymentStep === 'payment' ? 'Verifying payment...' : 'Processing payment...'}
              </p>
              <p className="text-xs text-blue-600 mt-1">
                Please wait while we confirm your payment with our secure webhook system.
              </p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
            Cancel
          </Button>
          {canRequest && (
            <Button 
              onClick={handlePayment} 
              disabled={loading}
              className="bg-green-600 hover:bg-green-700"
            >
              {loading ? "Verifying Payment..." : `Pay ₦${FEATURED_FEE.toLocaleString()} & Request Featured`}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RequestFeaturedDialog;
