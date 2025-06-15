
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyList from "@/components/PropertyList";
import { getProperties } from "@/services/propertyService";
import { Property } from "@/types/property";

const ShortletListings = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    const getShortlets = async () => {
      const allProps = await getProperties();
      setProperties(allProps.filter(
        (p) => p.property_type === "shortlet" && p.status === "available"
      ));
      setLoading(false);
    };
    getShortlets();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-semibold mb-8 text-secondary-800 text-center">
          All Shortlet Apartments in Abuja
        </h1>
        {loading ? (
          <div className="text-center py-12">Loading shortlet apartments...</div>
        ) : (
          <PropertyList 
            properties={properties}
            viewMode={viewMode}
            setViewMode={setViewMode}
            searchLocation=""
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ShortletListings;
