
import HeroSection from "@/components/HeroSection";
import FeaturedProperties from "@/components/FeaturedProperties";
import FeaturedShortlets from "@/components/FeaturedShortlets";
import HowItWorks from "@/components/HowItWorks";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeedButton from "@/components/SeedButton";
import { useState, useEffect } from "react";
import { Property } from "@/types/property";
import { getFeaturedProperties } from "@/services/propertyService";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const { userProfile } = useAuth();

  // Check if user can access admin panel
  const canAccessAdmin = userProfile?.role === 'admin' && userProfile?.email === 'admin@bobbieberry.com';

  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        const properties = await getFeaturedProperties();
        // Filter properties that are featured
        const featured = properties.filter(p => p.is_featured);
        setFeaturedProperties(featured);
      } catch (error) {
        console.error('Error fetching featured properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProperties();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <HeroSection />
      
      {/* Seed Button for Admin Users - Prominent placement */}
      {canAccessAdmin && (
        <div className="bg-yellow-50 border-b border-yellow-200 py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center space-y-4">
              <h3 className="text-xl font-semibold text-yellow-800">Admin Development Tools</h3>
              <p className="text-yellow-700 text-center">Use these tools to seed the database with sample data for testing</p>
              <div className="transform scale-125">
                <SeedButton />
              </div>
            </div>
          </div>
        </div>
      )}
      
      <FeaturedProperties properties={featuredProperties} loading={loading} />
      <FeaturedShortlets />
      <HowItWorks />
      <Footer />
    </div>
  );
};

export default Index;
