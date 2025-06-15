
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertTriangle, Shield, Bug, FileText } from "lucide-react";
import { useState } from "react";

const ReportIssue = () => {
  const [formData, setFormData] = useState({
    issueType: "",
    priority: "",
    title: "",
    description: "",
    propertyId: "",
    contactEmail: "",
    anonymous: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Issue report submitted:", formData);
    // Handle form submission here
  };

  const issueTypes = [
    {
      value: "fraudulent-listing",
      label: "Fraudulent Listing",
      icon: Shield,
      description: "Report fake or scam property listings"
    },
    {
      value: "inappropriate-content",
      label: "Inappropriate Content",
      icon: AlertTriangle,
      description: "Report offensive or inappropriate content"
    },
    {
      value: "technical-issue",
      label: "Technical Issue",
      icon: Bug,
      description: "Report website bugs or technical problems"
    },
    {
      value: "terms-violation",
      label: "Terms Violation",
      icon: FileText,
      description: "Report violations of terms of service"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-neutral-900 mb-4">Report an Issue</h1>
            <p className="text-xl text-neutral-600">Help us maintain a safe and trustworthy platform</p>
          </div>

          {/* Issue Types */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {issueTypes.map((type) => (
              <Card 
                key={type.value} 
                className={`cursor-pointer transition-all ${
                  formData.issueType === type.value 
                    ? 'border-primary-500 bg-primary-50' 
                    : 'hover:border-primary-300'
                }`}
                onClick={() => setFormData({...formData, issueType: type.value})}
              >
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-2">
                    <type.icon className={`w-6 h-6 ${
                      formData.issueType === type.value ? 'text-primary-600' : 'text-neutral-600'
                    }`} />
                    <h3 className="font-semibold">{type.label}</h3>
                  </div>
                  <p className="text-sm text-neutral-600">{type.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Report Form */}
          <Card>
            <CardHeader>
              <CardTitle>Issue Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Priority Level</label>
                    <Select value={formData.priority} onValueChange={(value) => setFormData({...formData, priority: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low - General concern</SelectItem>
                        <SelectItem value="medium">Medium - Notable issue</SelectItem>
                        <SelectItem value="high">High - Urgent issue</SelectItem>
                        <SelectItem value="critical">Critical - Safety concern</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Property ID (if applicable)</label>
                    <Input
                      value={formData.propertyId}
                      onChange={(e) => setFormData({...formData, propertyId: e.target.value})}
                      placeholder="Enter property ID"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Issue Title</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="Brief summary of the issue"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Detailed Description</label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Please provide as much detail as possible about the issue, including steps to reproduce if it's a technical problem..."
                    rows={6}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Contact Email</label>
                  <Input
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({...formData, contactEmail: e.target.value})}
                    placeholder="your@email.com"
                    required={!formData.anonymous}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="anonymous"
                    checked={formData.anonymous}
                    onCheckedChange={(checked) => setFormData({...formData, anonymous: checked as boolean})}
                  />
                  <label htmlFor="anonymous" className="text-sm text-neutral-700">
                    Submit this report anonymously
                  </label>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-800">Important Notice</h4>
                      <p className="text-sm text-yellow-700 mt-1">
                        False reports may result in account suspension. Please only report genuine issues.
                        For emergencies, contact local authorities immediately.
                      </p>
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white">
                  Submit Report
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ReportIssue;
