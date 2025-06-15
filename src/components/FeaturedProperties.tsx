
import PropertyCard from "./PropertyCard";
import { Property } from "@/types/property";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface FeaturedPropertiesProps {
  properties: Property[];
  loading: boolean;
}

const FeaturedProperties = ({ properties, loading }: FeaturedPropertiesProps) => {
  if (loading) {
    return (
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-poppins font-bold text-neutral-900 mb-4">
              Featured Properties
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Discover hand-picked premium properties from verified landlords and top-rated agents
            </p>
          </div>
          <div className="text-center">Loading featured properties...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-poppins font-bold text-neutral-900 mb-4">
            Featured Properties
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Discover hand-picked premium properties from verified landlords and top-rated agents
          </p>
        </div>

        {properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {properties.map((property, index) => (
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
            <p className="text-neutral-600 text-lg">No featured properties available at the moment.</p>
          </div>
        )}

        <div className="text-center mt-10">
          <Link to="/find-rentals">
            <Button size="lg" className="bg-primary-600 hover:bg-primary-700 text-white">
              View All Properties
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
