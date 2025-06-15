import { CheckCircle, Users, TrendingUp, Shield, Star, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ForAgents = () => {
  const {
    user,
    userProfile,
    registerAsAgent
  } = useAuth();
  const navigate = useNavigate();

  const handleJoinAsAgent = async () => {
    if (!user) {
      navigate('/agent-login');
      return;
    }
    if (userProfile?.role === 'agent') {
      toast.info('You are already registered as an agent. Waiting for admin approval.');
      return;
    }
    try {
      await registerAsAgent();
      toast.success('Successfully registered as an agent! Please wait for admin approval.');
    } catch (error) {
      console.error('Failed to register as agent:', error);
      toast.error('Failed to register as agent. Please try again.');
    }
  };

  const benefits = [{
    icon: Users,
    title: "Access to Quality Clients",
    description: "Connect with pre-qualified renters and serious property seekers looking for professional guidance."
  }, {
    icon: TrendingUp,
    title: "Increase Your Revenue",
    description: "Expand your business with our commission-based model and performance bonuses for top agents."
  }, {
    icon: Shield,
    title: "Verified Listings",
    description: "All properties go through our verification process, ensuring quality and legitimacy for your clients."
  }, {
    icon: Star,
    title: "Professional Profile",
    description: "Showcase your expertise with detailed profiles, client reviews, and performance metrics."
  }];

  const features = ["Lead generation and client matching", "Professional dashboard and analytics", "Marketing tools and templates", "24/7 customer support", "Mobile app for on-the-go management", "Integration with popular CRM systems"];

  const getButtonText = () => {
    if (!user) return "Join as Agent";
    if (userProfile?.role === 'agent' && !userProfile?.is_approved) return "Pending Approval";
    if (userProfile?.role === 'agent' && userProfile?.is_approved) return "Agent Dashboard";
    return "Join as Agent";
  };

  const handleButtonClick = () => {
    if (userProfile?.role === 'agent' && userProfile?.is_approved) {
      navigate('/agent-dashboard');
    } else {
      handleJoinAsAgent();
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-poppins font-bold mb-6">
              Grow Your Real Estate Business
            </h1>
            <p className="text-xl mb-8 leading-relaxed">
              Join HomeMatch's network of professional agents and connect with thousands of potential clients. 
              Our platform is designed to help you close more deals and build lasting relationships.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary-600 hover:bg-neutral-100" onClick={handleButtonClick} disabled={userProfile?.role === 'agent' && !userProfile?.is_approved}>
                {getButtonText()}
              </Button>
              <Button variant="outline" size="lg" className="border-white text-blue hover:bg-white hover:text-primary-600">
                <Phone className="w-5 h-5 mr-2" />
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </div>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-poppins font-bold text-neutral-900 mb-4">
              Why Choose HomeMatch?
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              We provide the tools, clients, and support you need to succeed in today's competitive market.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-8 border border-neutral-200">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                    <benefit.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900">{benefit.title}</h3>
                </div>
                <p className="text-neutral-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-poppins font-bold text-neutral-900 mb-4">
                Platform Features
              </h2>
              <p className="text-lg text-neutral-600">
                Everything you need to manage your business effectively
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-primary-600 mr-3 flex-shrink-0" />
                  <span className="text-neutral-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-poppins font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of successful agents who are growing their business with HomeMatch.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary-600 hover:bg-neutral-100" onClick={handleButtonClick} disabled={userProfile?.role === 'agent' && !userProfile?.is_approved}>
              {getButtonText()}
            </Button>
            <Button variant="outline" size="lg" className="border-white text-blue-100 hover:bg-white hover:text-primary-600">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ForAgents;
