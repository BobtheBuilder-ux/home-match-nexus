
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturedProperties from "@/components/FeaturedProperties";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white font-inter">
      <Header />
      <HeroSection />
      <FeaturedProperties />
      <HowItWorks />
      <Footer />
    </div>
  );
};

export default Index;
