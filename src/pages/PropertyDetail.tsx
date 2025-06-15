
import { useParams, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyImages from "@/components/PropertyImages";
import PropertyInfo from "@/components/PropertyInfo";
import PropertySidebar from "@/components/PropertySidebar";
import { usePropertyDetail } from "@/hooks/usePropertyDetail";
import { useToast } from "@/hooks/use-toast";

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const { property, loading } = usePropertyDetail(id);
  const { toast } = useToast();
  const showTourDialog = searchParams.get('tour') === 'true';

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
          <PropertyImages property={property} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <PropertyInfo property={property} />
            </div>
            <div>
              <PropertySidebar property={property} />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PropertyDetail;
