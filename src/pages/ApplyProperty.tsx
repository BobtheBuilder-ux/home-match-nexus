
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Property } from "@/types/property";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ApplicationForm from "@/components/ApplicationForm";

const ApplyProperty = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) return;
      
      try {
        const propertyDoc = await getDoc(doc(db, 'properties', id));
        if (propertyDoc.exists()) {
          setProperty({ id: propertyDoc.id, ...propertyDoc.data() } as Property);
        }
      } catch (error) {
        console.error('Error fetching property:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

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
        <ApplicationForm 
          propertyId={property.id} 
          propertyTitle={property.title} 
        />
      </div>

      <Footer />
    </div>
  );
};

export default ApplyProperty;
