
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { submitApplication } from "@/services/applicationService";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface ApplicationFormProps {
  propertyId: string;
  propertyTitle: string;
}

const ApplicationForm = ({ propertyId, propertyTitle }: ApplicationFormProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    employerName: "",
    jobTitle: "",
    monthlyIncome: "",
    employmentDuration: "",
    currentAddress: "",
    moveInDate: "",
    reasonForMoving: "",
    pets: false,
    petDetails: "",
    additionalComments: ""
  });

  const [references, setReferences] = useState([
    { name: "", relationship: "", phone: "", email: "" }
  ]);

  const { user } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleReferenceChange = (index: number, field: string, value: string) => {
    setReferences(prev => prev.map((ref, i) => 
      i === index ? { ...ref, [field]: value } : ref
    ));
  };

  const addReference = () => {
    if (references.length < 3) {
      setReferences(prev => [...prev, { name: "", relationship: "", phone: "", email: "" }]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Please sign in to submit an application");
      return;
    }

    setLoading(true);
    
    try {
      const applicationData = {
        property_id: propertyId,
        user_id: user.id,
        status: 'pending' as const,
        application_date: new Date().toISOString(),
        move_in_date: formData.moveInDate,
        monthly_income: parseFloat(formData.monthlyIncome) || null,
        employment_status: `${formData.jobTitle} at ${formData.employerName}`,
        emergency_contacts: {
          references: references.filter(ref => ref.name.trim() !== ""),
          ...formData
        },
        documents: null,
        notes: formData.additionalComments
      };

      await submitApplication(applicationData);
      toast.success("Application submitted successfully!");
      navigate('/my-applications');
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Apply for: {propertyTitle}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">First Name *</label>
                  <Input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Last Name *</label>
                  <Input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email *</label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone *</label>
                  <Input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Date of Birth *</label>
                  <Input
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Employment Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Employment Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Employer Name *</label>
                  <Input
                    name="employerName"
                    value={formData.employerName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Job Title *</label>
                  <Input
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Monthly Income *</label>
                  <Input
                    name="monthlyIncome"
                    type="number"
                    value={formData.monthlyIncome}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Employment Duration *</label>
                  <Input
                    name="employmentDuration"
                    placeholder="e.g., 2 years"
                    value={formData.employmentDuration}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Housing Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Housing Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Current Address *</label>
                  <Input
                    name="currentAddress"
                    value={formData.currentAddress}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Desired Move-in Date *</label>
                    <Input
                      name="moveInDate"
                      type="date"
                      value={formData.moveInDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Reason for Moving</label>
                  <Textarea
                    name="reasonForMoving"
                    value={formData.reasonForMoving}
                    onChange={handleInputChange}
                    rows={3}
                  />
                </div>
              </div>
            </div>

            {/* References */}
            <div>
              <h3 className="text-lg font-semibold mb-4">References</h3>
              {references.map((reference, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 border rounded-lg">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <Input
                      value={reference.name}
                      onChange={(e) => handleReferenceChange(index, 'name', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Relationship</label>
                    <Input
                      value={reference.relationship}
                      onChange={(e) => handleReferenceChange(index, 'relationship', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone</label>
                    <Input
                      value={reference.phone}
                      onChange={(e) => handleReferenceChange(index, 'phone', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input
                      value={reference.email}
                      onChange={(e) => handleReferenceChange(index, 'email', e.target.value)}
                    />
                  </div>
                </div>
              ))}
              {references.length < 3 && (
                <Button type="button" variant="outline" onClick={addReference}>
                  Add Reference
                </Button>
              )}
            </div>

            {/* Additional Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="pets"
                    checked={formData.pets}
                    onChange={handleInputChange}
                    className="rounded"
                  />
                  <label>Do you have pets?</label>
                </div>
                {formData.pets && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Pet Details</label>
                    <Textarea
                      name="petDetails"
                      value={formData.petDetails}
                      onChange={handleInputChange}
                      placeholder="Please describe your pets (type, breed, size, etc.)"
                      rows={3}
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium mb-2">Additional Comments</label>
                  <Textarea
                    name="additionalComments"
                    value={formData.additionalComments}
                    onChange={handleInputChange}
                    rows={3}
                  />
                </div>
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? "Submitting..." : "Submit Application"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplicationForm;
