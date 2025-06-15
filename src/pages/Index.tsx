
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturedProperties from "@/components/FeaturedProperties";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";
import SeedButton from "@/components/SeedButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-white font-inter">
      <Header />
      
      {/* Development Tools - Seed Button */}
      <div className="fixed top-4 right-4 z-50">
        <SeedButton />
      </div>
      
      <HeroSection />
      <FeaturedProperties />
      <HowItWorks />
      <Footer />
    </div>
  );
};

export default Index;
