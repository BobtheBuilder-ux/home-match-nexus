
import { Search, Calendar, Key, CheckCircle }from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: "Search & Discover",
      description: "Use our advanced search filters to find properties that match your exact needs and budget."
    },
    {
      icon: Calendar,
      title: "Schedule a Tour",
      description: "Book virtual or in-person tours directly with landlords and agents through our platform."
    },
    {
      icon: CheckCircle,
      title: "Apply & Verify",
      description: "Submit your application with all required documents through our secure verification system."
    },
    {
      icon: Key,
      title: "Move In",
      description: "Complete the rental process and get your keys. Welcome to your new home!"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-poppins font-bold text-neutral-900 mb-4">
            How HomeMatch Works
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Finding your perfect rental home has never been easier. Follow these simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-6">
                {/* Step Number */}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold z-10">
                  {index + 1}
                </div>
                
                {/* Icon Container */}
                <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="w-8 h-8 text-primary-600" />
                </div>
                
                {/* Connecting Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary-200 to-transparent"></div>
                )}
              </div>
              
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                {step.title}
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <button className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-medium transition-colors mr-4">
            Start Your Search
          </button>
          <button className="border border-primary-600 text-primary-600 hover:bg-primary-50 px-8 py-3 rounded-lg font-medium transition-colors">
            List Your Property
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
