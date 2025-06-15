
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { getProperties, updateProperty, deleteProperty } from '@/services/propertyService';
import { getUserProfiles, updateUserApprovalStatus } from '@/services/adminService';
import { getFeaturedRequests, updateFeaturedRequestStatus } from '@/services/featuredPropertyService';
import { Property } from '@/types/property';
import { UserProfile } from '@/services/userService';
import { FeaturedRequest } from '@/services/featuredPropertyService';
import { useToast } from '@/hooks/use-toast';
import AdminStats from '@/components/admin/AdminStats';
import AdminOverviewCards from '@/components/admin/AdminOverviewCards';
import PropertiesTable from '@/components/admin/PropertiesTable';
import FeaturedPropertiesTable from '@/components/admin/FeaturedPropertiesTable';
import FeaturedRequestsTable from '@/components/admin/FeaturedRequestsTable';
import UsersTable from '@/components/admin/UsersTable';
import AdminSettings from '@/components/admin/AdminSettings';
import AdminTabs from '@/components/admin/AdminTabs';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [properties, setProperties] = useState<Property[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [featuredRequests, setFeaturedRequests] = useState<FeaturedRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [propertiesData, usersData, requestsData] = await Promise.all([
        getProperties(),
        getUserProfiles(),
        getFeaturedRequests()
      ]);
      setProperties(propertiesData);
      setUsers(usersData);
      setFeaturedRequests(requestsData);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to fetch data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Calculate stats from real data
  const stats = {
    totalProperties: properties.length,
    totalTenants: users.filter(u => u.role === 'customer').length,
    totalAgents: users.filter(u => u.role === 'agent').length,
    pendingAgents: users.filter(u => u.role === 'agent' && !u.isApproved).length,
    activeMaintenanceTickets: 8, // TODO: implement maintenance service
    pendingApplications: 12, // TODO: implement applications service
    monthlyRevenue: properties.reduce((sum, p) => sum + (p.price || 0), 0),
    pendingFeaturedRequests: featuredRequests.filter(r => r.status === 'pending').length
  };

  const handlePropertyStatusChange = async (propertyId: string, status: 'active' | 'draft' | 'rented') => {
    try {
      await updateProperty(propertyId, { status });
      setProperties(properties.map(p => 
        p.id === propertyId ? { ...p, status } : p
      ));
      toast({
        title: "Success",
        description: "Property status updated",
      });
    } catch (error) {
      console.error('Error updating property:', error);
      toast({
        title: "Error",
        description: "Failed to update property status",
        variant: "destructive",
      });
    }
  };

  const handleDeleteProperty = async (propertyId: string) => {
    if (!confirm('Are you sure you want to delete this property?')) return;
    
    try {
      await deleteProperty(propertyId);
      setProperties(properties.filter(p => p.id !== propertyId));
      toast({
        title: "Success",
        description: "Property deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting property:', error);
      toast({
        title: "Error",
        description: "Failed to delete property",
        variant: "destructive",
      });
    }
  };

  const handleApproveAgent = async (userId: string) => {
    try {
      await updateUserApprovalStatus(userId, true);
      setUsers(users.map(u => 
        u.userId === userId ? { ...u, isApproved: true } : u
      ));
      toast({
        title: "Success",
        description: "Agent approved successfully",
      });
    } catch (error) {
      console.error('Error approving agent:', error);
      toast({
        title: "Error",
        description: "Failed to approve agent",
        variant: "destructive",
      });
    }
  };

  const handleRejectAgent = async (userId: string) => {
    try {
      await updateUserApprovalStatus(userId, false);
      setUsers(users.map(u => 
        u.userId === userId ? { ...u, isApproved: false } : u
      ));
      toast({
        title: "Success",
        description: "Agent rejected",
      });
    } catch (error) {
      console.error('Error rejecting agent:', error);
      toast({
        title: "Error",
        description: "Failed to reject agent",
        variant: "destructive",
      });
    }
  };

  const handleApproveFeaturedRequest = async (requestId: string) => {
    try {
      const request = featuredRequests.find(r => r.id === requestId);
      if (!request) return;

      await updateFeaturedRequestStatus(requestId, 'approved');
      await updateProperty(request.propertyId, { isFeatured: true });
      
      setFeaturedRequests(featuredRequests.map(r => 
        r.id === requestId ? { ...r, status: 'approved' } : r
      ));
      setProperties(properties.map(p => 
        p.id === request.propertyId ? { ...p, isFeatured: true } : p
      ));
      
      toast({
        title: "Success",
        description: "Featured request approved",
      });
    } catch (error) {
      console.error('Error approving featured request:', error);
      toast({
        title: "Error",
        description: "Failed to approve featured request",
        variant: "destructive",
      });
    }
  };

  const handleRejectFeaturedRequest = async (requestId: string) => {
    try {
      await updateFeaturedRequestStatus(requestId, 'rejected');
      setFeaturedRequests(featuredRequests.map(r => 
        r.id === requestId ? { ...r, status: 'rejected' } : r
      ));
      toast({
        title: "Success",
        description: "Featured request rejected",
      });
    } catch (error) {
      console.error('Error rejecting featured request:', error);
      toast({
        title: "Error",
        description: "Failed to reject featured request",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': case 'active': case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': case 'draft': case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': case 'open': return 'bg-red-100 text-red-800';
      case 'rented': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAgentName = (agentId: string) => {
    const agent = users.find(u => u.userId === agentId && u.role === 'agent');
    return agent?.displayName || 'N/A';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Manage your rental properties and users</p>
          </div>

          <AdminTabs activeTab={activeTab} onTabChange={setActiveTab} />

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsContent value="overview" className="space-y-6">
              <AdminStats stats={stats} />
              <AdminOverviewCards
                properties={properties}
                users={users}
                handleApproveAgent={handleApproveAgent}
                handleRejectAgent={handleRejectAgent}
                getStatusColor={getStatusColor}
              />
            </TabsContent>

            <TabsContent value="properties" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Properties Management</h2>
                <Badge variant="secondary">{properties.length} Total Properties</Badge>
              </div>
              <PropertiesTable
                properties={properties}
                handlePropertyStatusChange={handlePropertyStatusChange}
                handleDeleteProperty={handleDeleteProperty}
              />
            </TabsContent>

            <TabsContent value="featured" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Featured Properties Management</h2>
                <div className="flex gap-2">
                  <Badge variant="secondary">{properties.filter(p => p.isFeatured).length} Featured</Badge>
                  <Badge variant="outline">{stats.pendingFeaturedRequests} Pending Requests</Badge>
                </div>
              </div>
              
              <FeaturedRequestsTable
                requests={featuredRequests}
                onApprove={handleApproveFeaturedRequest}
                onReject={handleRejectFeaturedRequest}
                getAgentName={getAgentName}
              />
              
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Currently Featured Properties</h3>
                <FeaturedPropertiesTable
                  properties={properties}
                  getAgentName={getAgentName}
                />
              </div>
            </TabsContent>

            <TabsContent value="maintenance" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Maintenance Management</h2>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Ticket
                </Button>
              </div>
              <Card>
                <CardContent className="p-6">
                  <p className="text-center text-gray-500">Maintenance system integration coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="applications" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Application Management</h2>
                <Badge variant="secondary">{stats.pendingApplications} Pending</Badge>
              </div>
              <Card>
                <CardContent className="p-6">
                  <p className="text-center text-gray-500">Application management system coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tenants" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">User Management</h2>
                <div className="flex gap-2">
                  <Badge variant="secondary">{stats.totalTenants} Customers</Badge>
                  <Badge variant="secondary">{stats.totalAgents} Agents</Badge>
                </div>
              </div>
              <UsersTable
                users={users}
                getStatusColor={getStatusColor}
                handleApproveAgent={handleApproveAgent}
                handleRejectAgent={handleRejectAgent}
              />
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">System Settings</h2>
              </div>
              <AdminSettings />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
