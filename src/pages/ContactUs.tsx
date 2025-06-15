
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    // Handle form submission here
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "support@homematch.com",
      description: "Send us an email anytime"
    },
    {
      icon: Phone,
      title: "Phone",
      value: "1-800-HOME-MATCH",
      description: "Call us during business hours"
    },
    {
      icon: MapPin,
      title: "Address",
      value: "123 Real Estate Ave, San Francisco, CA 94102",
      description: "Visit our office"
    },
    {
      icon: Clock,
      title: "Business Hours",
      value: "Mon-Fri: 9AM-6PM PST",
      description: "We're here to help"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-neutral-900 mb-4">Contact Us</h1>
            <p className="text-xl text-neutral-600">Get in touch with our support team</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>Send us a message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Name</label>
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="technical">Technical Support</SelectItem>
                        <SelectItem value="billing">Billing Question</SelectItem>
                        <SelectItem value="property">Property Related</SelectItem>
                        <SelectItem value="account">Account Issues</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Subject</label>
                    <Input
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      placeholder="Brief description of your inquiry"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Please provide details about your inquiry..."
                      rows={5}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-primary-600 hover:bg-primary-700">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Get in touch</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-600 mb-6">
                    Have questions? We're here to help. Reach out to us through any of the following methods:
                  </p>
                  
                  <div className="space-y-4">
                    {contactInfo.map((info, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="bg-primary-100 p-3 rounded-lg">
                          <info.icon className="w-6 h-6 text-primary-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-neutral-900">{info.title}</h3>
                          <p className="text-neutral-700 font-medium">{info.value}</p>
                          <p className="text-sm text-neutral-500">{info.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* FAQ Link */}
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-blue-900 mb-2">Before you contact us</h3>
                  <p className="text-blue-700 mb-4">
                    Check our Help Center for quick answers to common questions.
                  </p>
                  <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100">
                    Visit Help Center
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactUs;
