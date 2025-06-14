
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getApplicationsByApplicant } from "@/services/applicationService";
import { TenantApplication } from "@/types/application";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin } from "lucide-react";

const MyApplications = () => {
  const [applications, setApplications] = useState<TenantApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchApplications = async () => {
      if (!user) return;
      
      try {
        const userApplications = await getApplicationsByApplicant(user.uid);
        setApplications(userApplications);
      } catch (error) {
        console.error('Error fetching applications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [user]);

  const getStatusColor = (status: TenantApplication['status']) => {
    switch (status) {
      case 'submitted': return 'bg-blue-100 text-blue-800';
      case 'under_review': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: TenantApplication['status']) => {
    switch (status) {
      case 'submitted': return 'Submitted';
      case 'under_review': return 'Under Review';
      case 'approved': return 'Approved';
      case 'rejected': return 'Rejected';
      default: return status;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading your applications...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">My Applications</h1>
          
          {applications.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-gray-600">You haven't submitted any applications yet.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {applications.map((application) => (
                <Card key={application.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">
                        Application for Property ID: {application.propertyId}
                      </CardTitle>
                      <Badge className={getStatusColor(application.status)}>
                        {getStatusText(application.status)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>Submitted: {new Date(application.submittedAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>Move-in Date: {new Date(application.moveInDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold mb-2">Application Details</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                        <p><span className="font-medium">Name:</span> {application.firstName} {application.lastName}</p>
                        <p><span className="font-medium">Email:</span> {application.email}</p>
                        <p><span className="font-medium">Employer:</span> {application.employerName}</p>
                        <p><span className="font-medium">Monthly Income:</span> ${application.monthlyIncome.toLocaleString()}</p>
                      </div>
                    </div>
                    
                    {application.reviewedAt && (
                      <div className="mt-2 text-sm text-gray-600">
                        Reviewed: {new Date(application.reviewedAt).toLocaleDateString()}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MyApplications;
