
import PropertyCard from "./PropertyCard";

const FeaturedProperties = () => {
  // Mock data for featured properties
  const featuredProperties = [
    {
      id: "1",
      title: "Modern Downtown Apartment with City Views",
      location: "Downtown, Seattle, WA",
      price: 2800,
      bedrooms: 2,
      bathrooms: 2,
      area: 1200,
      images: [
        "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&h=600&fit=crop"
      ],
      amenities: ["Gym", "Pool", "Parking", "Pet Friendly"],
      isNew: true,
      isFeatured: true
    },
    {
      id: "2",
      title: "Charming Victorian House in Historic District",
      location: "Capitol Hill, Denver, CO",
      price: 3200,
      bedrooms: 3,
      bathrooms: 2.5,
      area: 1800,
      images: [
        "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop"
      ],
      amenities: ["Garden", "Fireplace", "Hardwood Floors", "Washer/Dryer"],
      isFeatured: true
    },
    {
      id: "3",
      title: "Luxury Studio with Premium Amenities",
      location: "SoMa, San Francisco, CA",
      price: 2400,
      bedrooms: 0,
      bathrooms: 1,
      area: 600,
      images: [
        "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop"
      ],
      amenities: ["Concierge", "Rooftop", "High-Speed Internet"],
      isNew: true
    },
    {
      id: "4",
      title: "Spacious Family Home with Backyard",
      location: "Suburbs, Austin, TX",
      price: 2100,
      bedrooms: 4,
      bathrooms: 3,
      area: 2200,
      images: [
        "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop"
      ],
      amenities: ["Garage", "Backyard", "School District", "Quiet Area"]
    }
  ];

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredProperties.map((property, index) => (
            <div
              key={property.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <PropertyCard property={property} />
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
            View All Properties
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
