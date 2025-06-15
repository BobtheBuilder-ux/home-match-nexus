import HeroSection from "@/components/HeroSection";
import FeaturedProperties from "@/components/FeaturedProperties";
import FeaturedShortlets from "@/components/FeaturedShortlets";
import HowItWorks from "@/components/HowItWorks";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { Property } from "@/types/property";
import { getFeaturedProperties } from "@/services/propertyService";

const Index = () => {
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

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
      <FeaturedProperties properties={featuredProperties} loading={loading} />
      <FeaturedShortlets />
      <HowItWorks />
      <Footer />
    </div>
  );
};

export default Index;
