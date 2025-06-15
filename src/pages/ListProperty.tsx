
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyForm from "@/components/PropertyForm";
import ShortletPropertyForm from "@/components/ShortletPropertyForm";
import { useLocation } from "react-router-dom";

const ListProperty = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const type = params.get("type");

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-poppins font-bold mb-4">
            {type === "shortlet" ? "List Shortlet Apartment" : "List Your Property"}
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Reach thousands of potential tenants and find the perfect renter for your property
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {type === "shortlet" ? <ShortletPropertyForm /> : <PropertyForm />}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ListProperty;
