
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturedProperties from "@/components/FeaturedProperties";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";
import SeedButton from "@/components/SeedButton";
import { getProperties } from "@/services/propertyService";
import { Property } from "@/types/property";

const Index = () => {
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        const properties = await getProperties();
        // Filter for featured properties
        const featured = properties.filter(property => property.isFeatured).slice(0, 4);
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
    <div className="min-h-screen bg-white font-inter">
      <Header />
      
      {/* Development Tools - Seed Button */}
      <div className="fixed top-4 right-4 z-50">
        <SeedButton />
      </div>
      
      <HeroSection />
      <FeaturedProperties properties={featuredProperties} loading={loading} />
      <HowItWorks />
      <Footer />
    </div>
  );
};

export default Index;
