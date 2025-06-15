
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, HelpCircle, MessageCircle, FileText } from "lucide-react";
import { useState } from "react";

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const faqs = [
    {
      question: "How do I search for rentals?",
      answer: "Use our search bar to enter your desired location, then filter by price, bedrooms, and amenities to find your perfect rental."
    },
    {
      question: "How do I apply for a property?",
      answer: "Click 'View Details' on any property, then click 'Apply Now' to submit your rental application with required documents."
    },
    {
      question: "What documents do I need to apply?",
      answer: "You'll typically need ID, proof of income, employment verification, and references. Specific requirements are listed on each property."
    },
    {
      question: "How do I contact a landlord or agent?",
      answer: "Use the 'Contact Agent' button on property detail pages to send a message directly to the property owner or agent."
    }
  ];

  const categories = [
    {
      title: "Getting Started",
      icon: HelpCircle,
      topics: ["Account Setup", "First Search", "Understanding Listings"]
    },
    {
      title: "Applications",
      icon: FileText,
      topics: ["Application Process", "Required Documents", "Application Status"]
    },
    {
      title: "Communication",
      icon: MessageCircle,
      topics: ["Contacting Agents", "Scheduling Tours", "Message History"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-neutral-900 mb-4">Help Center</h1>
            <p className="text-xl text-neutral-600">Find answers to your questions and get help with HomeMatch</p>
          </div>

          {/* Search */}
          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
            <Input
              placeholder="Search for help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 text-lg"
            />
          </div>

          {/* Categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {categories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="text-center">
                  <category.icon className="w-12 h-12 mx-auto text-primary-600 mb-4" />
                  <CardTitle>{category.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.topics.map((topic, idx) => (
                      <li key={idx} className="text-neutral-600 hover:text-primary-600 cursor-pointer">
                        {topic}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* FAQs */}
          <div>
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-neutral-600">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Contact Support */}
          <div className="text-center mt-12">
            <h3 className="text-xl font-semibold mb-4">Can't find what you're looking for?</h3>
            <Button size="lg" className="bg-primary-600 hover:bg-primary-700">
              Contact Support
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HelpCenter;
