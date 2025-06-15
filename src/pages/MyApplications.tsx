
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getUserApplications, TenantApplication } from "@/services/applicationService";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

const MyApplications = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState<TenantApplication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      if (user) {
        try {
          const userApplications = await getUserApplications(user.id);
          setApplications(userApplications);
        } catch (error) {
          console.error('Error fetching applications:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchApplications();
  }, [user]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
              <p className="text-neutral-600">Loading your applications...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-poppins font-bold text-neutral-900 mb-8">
            My Applications
          </h1>
          
          {applications.length === 0 ? (
            <Card>
              <CardContent className="text-center py-16">
                <p className="text-neutral-600 mb-4">You haven't submitted any applications yet.</p>
                <Button onClick={() => window.location.href = '/find-rentals'}>
                  Browse Properties
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {applications.map((application) => (
                <Card key={application.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl mb-2">
                          Application for Property
                        </CardTitle>
                        <p className="text-neutral-600">
                          Submitted on {new Date(application.application_date).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge className={getStatusColor(application.status)}>
                        {application.status.toUpperCase()}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="font-medium text-neutral-700">Property ID</p>
                        <p className="text-neutral-900">{application.property_id}</p>
                      </div>
                      <div>
                        <p className="font-medium text-neutral-700">Move-in Date</p>
                        <p className="text-neutral-900">
                          {application.move_in_date ? new Date(application.move_in_date).toLocaleDateString() : 'Not specified'}
                        </p>
                      </div>
                      <div>
                        <p className="font-medium text-neutral-700">Monthly Income</p>
                        <p className="text-neutral-900">
                          {application.monthly_income ? `₦${application.monthly_income.toLocaleString()}` : 'Not specified'}
                        </p>
                      </div>
                      <div>
                        <p className="font-medium text-neutral-700">Employment Status</p>
                        <p className="text-neutral-900">{application.employment_status || 'Not specified'}</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </div>
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
