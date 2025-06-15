
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldAlert, Eye, Lock, AlertTriangle, CheckCircle } from "lucide-react";

const SafetyTips = () => {
  const safetyTips = [
    {
      title: "Verify Property Legitimacy",
      icon: Eye,
      tips: [
        "Always visit the property in person before making any payments",
        "Verify the landlord's identity and property ownership",
        "Be wary of deals that seem too good to be true",
        "Check property records with local authorities if needed"
      ]
    },
    {
      title: "Secure Payment Practices",
      icon: Lock,
      tips: [
        "Never wire money or send cash to unknown parties",
        "Use secure payment methods with transaction records",
        "Avoid paying large sums before seeing the property",
        "Get receipts for all payments made"
      ]
    },
    {
      title: "Communication Safety",
      icon: ShieldAlert,
      tips: [
        "Keep all communication within HomeMatch platform initially",
        "Don't share personal financial information early",
        "Be cautious of urgent pressure to make quick decisions",
        "Trust your instincts if something feels wrong"
      ]
    },
    {
      title: "Red Flags to Watch For",
      icon: AlertTriangle,
      tips: [
        "Landlords who refuse to meet in person or show the property",
        "Requests for payment before viewing or signing a lease",
        "Properties priced significantly below market rate",
        "Poor grammar or spelling in official communications"
      ]
    }
  ];

  const bestPractices = [
    "Research the neighborhood and average rental prices",
    "Read all lease terms carefully before signing",
    "Document the property condition with photos",
    "Keep copies of all rental-related documents",
    "Know your tenant rights and local rental laws"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-neutral-900 mb-4">Safety Tips</h1>
            <p className="text-xl text-neutral-600">Stay safe while searching for your perfect rental home</p>
          </div>

          {/* Safety Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {safetyTips.map((category, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <category.icon className="w-6 h-6 text-red-600" />
                    <CardTitle className="text-lg">{category.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.tips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-neutral-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Best Practices */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl">General Best Practices</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {bestPractices.map((practice, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-neutral-700">{practice}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Emergency Contact */}
          <Card className="bg-red-50 border-red-200">
            <CardHeader>
              <CardTitle className="text-xl text-red-800">Report Suspicious Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-red-700 mb-4">
                If you encounter suspicious listings or fraudulent activity, report it immediately to help keep our community safe.
              </p>
              <div className="space-y-2">
                <p className="text-red-700"><strong>Email:</strong> security@homematch.com</p>
                <p className="text-red-700"><strong>Phone:</strong> 1-800-SAFE-HOME</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SafetyTips;
