
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturedProperties from "@/components/FeaturedProperties";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";
import FeaturedShortlets from "@/components/FeaturedShortlets";
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
      
      <HeroSection />
      <FeaturedProperties properties={featuredProperties} loading={loading} />
      {/* Add featured shortlet apartments section below regular featured */}
      <FeaturedShortlets />
      <HowItWorks />
      <Footer />
    </div>
  );
};

export default Index;
