import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Users, 
  Home, 
  Wrench, 
  FileText, 
  BarChart3, 
  Settings,
  Eye,
  Edit,
  Trash2,
  Star,
  Check,
  X,
  Plus,
  Save,
  Mail,
  Phone,
  Calendar
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { getProperties, updateProperty, deleteProperty } from '@/services/propertyService';
import { getUserProfiles, updateUserApprovalStatus } from '@/services/adminService';
import { Property } from '@/types/property';
import { UserProfile } from '@/services/userService';
import { useToast } from '@/hooks/use-toast';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [properties, setProperties] = useState<Property[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [editingUser, setEditingUser] = useState<UserProfile | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [propertiesData, usersData] = await Promise.all([
        getProperties(),
        getUserProfiles()
      ]);
      setProperties(propertiesData);
      setUsers(usersData);
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
    monthlyRevenue: properties.reduce((sum, p) => sum + (p.price || 0), 0)
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

  const handleFeatureToggle = async (propertyId: string, isFeatured: boolean) => {
    try {
      await updateProperty(propertyId, { isFeatured: !isFeatured });
      setProperties(properties.map(p => 
        p.id === propertyId ? { ...p, isFeatured: !isFeatured } : p
      ));
      toast({
        title: "Success",
        description: `Property ${!isFeatured ? 'featured' : 'unfeatured'}`,
      });
    } catch (error) {
      console.error('Error updating featured status:', error);
      toast({
        title: "Error",
        description: "Failed to update featured status",
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': case 'active': case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': case 'draft': case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': case 'open': return 'bg-red-100 text-red-800';
      case 'rented': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
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

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-7">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="properties" className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                Properties
              </TabsTrigger>
              <TabsTrigger value="featured" className="flex items-center gap-2">
                <Star className="w-4 h-4" />
                Featured
              </TabsTrigger>
              <TabsTrigger value="maintenance" className="flex items-center gap-2">
                <Wrench className="w-4 h-4" />
                Maintenance
              </TabsTrigger>
              <TabsTrigger value="applications" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Applications
              </TabsTrigger>
              <TabsTrigger value="tenants" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Users
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Properties</CardTitle>
                    <Home className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.totalProperties}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Customers</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.totalTenants}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Agents</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.totalAgents}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pending Agents</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.pendingAgents}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Tickets</CardTitle>
                    <Wrench className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.activeMaintenanceTickets}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${stats.monthlyRevenue.toLocaleString()}</div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Properties</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {properties.slice(0, 5).map((property) => (
                        <div key={property.id} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{property.title}</p>
                            <p className="text-sm text-gray-500">{property.address} • ${property.price}/month</p>
                          </div>
                          <Badge className={getStatusColor(property.status || 'active')}>
                            {property.status || 'active'}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Pending Agent Approvals</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {users.filter(u => u.role === 'agent' && !u.isApproved).slice(0, 5).map((user) => (
                        <div key={user.userId} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{user.displayName}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleApproveAgent(user.userId)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <Check className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleRejectAgent(user.userId)}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="properties" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Properties Management</h2>
                <Badge variant="secondary">{properties.length} Total Properties</Badge>
              </div>
              
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Address</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Featured</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {properties.map((property) => (
                        <TableRow key={property.id}>
                          <TableCell className="font-medium">{property.title}</TableCell>
                          <TableCell>{property.address}, {property.city}</TableCell>
                          <TableCell>${property.price}/month</TableCell>
                          <TableCell>
                            <select
                              value={property.status || 'active'}
                              onChange={(e) => handlePropertyStatusChange(property.id, e.target.value as 'active' | 'draft' | 'rented')}
                              className="px-2 py-1 border rounded text-sm"
                            >
                              <option value="active">Active</option>
                              <option value="draft">Draft</option>
                              <option value="rented">Rented</option>
                            </select>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleFeatureToggle(property.id, property.isFeatured || false)}
                            >
                              {property.isFeatured ? <Star className="w-4 h-4 fill-current" /> : <Star className="w-4 h-4" />}
                            </Button>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => window.open(`/property/${property.id}`, '_blank')}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDeleteProperty(property.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="featured" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Featured Properties</h2>
                <Badge variant="secondary">{properties.filter(p => p.isFeatured).length} Featured</Badge>
              </div>
              
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Property</TableHead>
                        <TableHead>Agent</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Date Added</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {properties.filter(p => p.isFeatured).map((property) => (
                        <TableRow key={property.id}>
                          <TableCell className="font-medium">{property.title}</TableCell>
                          <TableCell>{getAgentName(property.agentId)}</TableCell>
                          <TableCell>${property.price}/month</TableCell>
                          <TableCell>{new Date(property.dateAdded).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => window.open(`/property/${property.id}`, '_blank')}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleFeatureToggle(property.id, true)}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
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
              
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.userId}>
                          <TableCell className="font-medium">{user.displayName}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="capitalize">
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {user.role === 'agent' ? (
                              <Badge className={getStatusColor(user.isApproved ? 'approved' : 'pending')}>
                                {user.isApproved ? 'Approved' : 'Pending'}
                              </Badge>
                            ) : (
                              <Badge className={getStatusColor('active')}>Active</Badge>
                            )}
                          </TableCell>
                          <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>User Details</DialogTitle>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <div>
                                      <label className="text-sm font-medium">Name</label>
                                      <p className="text-sm text-gray-600">{user.displayName}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">Email</label>
                                      <p className="text-sm text-gray-600">{user.email}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">Role</label>
                                      <p className="text-sm text-gray-600 capitalize">{user.role}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">Joined</label>
                                      <p className="text-sm text-gray-600">{new Date(user.createdAt).toLocaleDateString()}</p>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                              
                              {user.role === 'agent' && !user.isApproved && (
                                <>
                                  <Button
                                    size="sm"
                                    onClick={() => handleApproveAgent(user.userId)}
                                    className="bg-green-600 hover:bg-green-700"
                                  >
                                    <Check className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => handleRejectAgent(user.userId)}
                                  >
                                    <X className="w-4 h-4" />
                                  </Button>
                                </>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">System Settings</h2>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Platform Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Platform Name</label>
                      <Input defaultValue="HomeMatch" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Support Email</label>
                      <Input defaultValue="support@homematch.com" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Commission Rate (%)</label>
                      <Input type="number" defaultValue="5" />
                    </div>
                    <Button>
                      <Save className="w-4 h-4 mr-2" />
                      Save Settings
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Email Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">SMTP Server</label>
                      <Input placeholder="smtp.gmail.com" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">SMTP Port</label>
                      <Input type="number" placeholder="587" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">From Email</label>
                      <Input placeholder="noreply@homematch.com" />
                    </div>
                    <Button>
                      <Save className="w-4 h-4 mr-2" />
                      Save Email Settings
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
