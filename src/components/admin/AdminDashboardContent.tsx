
import React from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { Property } from '@/types/property';
import { UserProfile } from '@/services/userService';
import { FeaturedRequest } from '@/services/featuredPropertyService';
import AdminStats from '@/components/admin/AdminStats';
import AdminOverviewCards from '@/components/admin/AdminOverviewCards';
import PropertiesTable from '@/components/admin/PropertiesTable';
import FeaturedPropertiesTable from '@/components/admin/FeaturedPropertiesTable';
import FeaturedRequestsTable from '@/components/admin/FeaturedRequestsTable';
import UsersTable from '@/components/admin/UsersTable';
import AdminSettings from '@/components/admin/AdminSettings';
import AdminTabs from '@/components/admin/AdminTabs';

interface AdminDashboardContentProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  properties: Property[];
  users: UserProfile[];
  featuredRequests: FeaturedRequest[];
  stats: any;
  handlers: {
    handlePropertyStatusChange: (propertyId: string, status: 'active' | 'draft' | 'rented') => void;
    handleDeleteProperty: (propertyId: string) => void;
    handleApproveAgent: (userId: string) => void;
    handleRejectAgent: (userId: string) => void;
    handleApproveFeaturedRequest: (requestId: string) => void;
    handleRejectFeaturedRequest: (requestId: string) => void;
  };
}

const AdminDashboardContent: React.FC<AdminDashboardContentProps> = ({
  activeTab,
  setActiveTab,
  properties,
  users,
  featuredRequests,
  stats,
  handlers
}) => {
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

  return (
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
            handleApproveAgent={handlers.handleApproveAgent}
            handleRejectAgent={handlers.handleRejectAgent}
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
            handlePropertyStatusChange={handlers.handlePropertyStatusChange}
            handleDeleteProperty={handlers.handleDeleteProperty}
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
            onApprove={handlers.handleApproveFeaturedRequest}
            onReject={handlers.handleRejectFeaturedRequest}
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
            handleApproveAgent={handlers.handleApproveAgent}
            handleRejectAgent={handlers.handleRejectAgent}
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
  );
};

export default AdminDashboardContent;
