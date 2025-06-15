
import { useEffect, useState } from "react";
import { getProperties } from "@/services/propertyService";
import PropertyCard from "./PropertyCard";
import { Property } from "@/types/property";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const FeaturedShortlets = () => {
  const [shortlets, setShortlets] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShortletProps = async () => {
      const allProps = await getProperties();
      const filtered = allProps.filter(
        (p) => p.property_type === "shortlet" && p.status === "available" && p.is_featured
      ).slice(0, 4);
      setShortlets(filtered);
      setLoading(false);
    };
    fetchShortletProps();
  }, []);

  return (
    <section className="py-16 bg-secondary-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-poppins font-bold text-secondary-900 mb-4">
            Featured Shortlet Apartments
          </h2>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Discover amazing shortlet apartment deals for your next stay in Abuja.
          </p>
        </div>

        {loading ? (
          <div className="text-center">Loading featured shortlets...</div>
        ) : shortlets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {shortlets.map((property, index) => (
              <div
                key={property.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-secondary-600 text-lg">No featured shortlet apartments at the moment.</p>
          </div>
        )}

        <div className="text-center mt-10">
          <Link to="/shortlets">
            <Button size="lg" className="bg-secondary-600 hover:bg-secondary-700 text-white">
              View All Shortlets
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedShortlets;
