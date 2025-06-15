import { useState } from "react";
import { Trash2, Plus, Home, Edit, Eye, Star } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";
import RequestFeaturedDialog from "@/components/RequestFeaturedDialog";

interface Property {
  id: string;
  title: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  status: 'active' | 'draft' | 'rented';
  dateAdded: string;
  isFeatured?: boolean;
  featuredRequestStatus?: 'none' | 'pending' | 'approved' | 'rejected';
}

const AgentDashboard = () => {
  const [properties, setProperties] = useState<Property[]>([
    {
      id: '1',
      title: 'Modern Downtown Apartment',
      address: '123 Main St, Downtown',
      price: 2500,
      bedrooms: 2,
      bathrooms: 2,
      status: 'active',
      dateAdded: '2024-06-10',
      isFeatured: false,
      featuredRequestStatus: 'none'
    },
    {
      id: '2',
      title: 'Cozy Studio in Arts District',
      address: '456 Art Ave, Arts District',
      price: 1800,
      bedrooms: 1,
      bathrooms: 1,
      status: 'active',
      dateAdded: '2024-06-08',
      isFeatured: false,
      featuredRequestStatus: 'pending'
    },
    {
      id: '3',
      title: 'Luxury Penthouse',
      address: '789 High St, Uptown',
      price: 4500,
      bedrooms: 3,
      bathrooms: 3,
      status: 'draft',
      dateAdded: '2024-06-05',
      isFeatured: true,
      featuredRequestStatus: 'approved'
    }
  ]);

  const [featuredDialog, setFeaturedDialog] = useState<{
    open: boolean;
    propertyId: string;
    propertyTitle: string;
    currentStatus?: 'none' | 'pending' | 'approved' | 'rejected';
  }>({
    open: false,
    propertyId: '',
    propertyTitle: '',
    currentStatus: 'none'
  });

  const handleDeleteProperty = (propertyId: string) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      setProperties(properties.filter(property => property.id !== propertyId));
    }
  };

  const handleRequestFeatured = (property: Property) => {
    setFeaturedDialog({
      open: true,
      propertyId: property.id,
      propertyTitle: property.title,
      currentStatus: property.featuredRequestStatus || 'none'
    });
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case 'active':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'draft':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'rented':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const getFeaturedStatusBadge = (status?: string, isFeatured?: boolean) => {
    if (isFeatured) {
      return (
        <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 flex items-center gap-1">
          <Star className="w-3 h-3" />
          Featured
        </span>
      );
    }

    switch (status) {
      case 'pending':
        return (
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Request Pending
          </span>
        );
      case 'rejected':
        return (
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
            Request Declined
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-poppins font-bold text-neutral-900">Agent Dashboard</h1>
            <p className="text-neutral-600 mt-2">Manage your property listings</p>
          </div>
          <div className="flex gap-3">
            <Link to="/list-property">
              <Button className="bg-primary-600 hover:bg-primary-700">
                <Plus className="w-4 h-4 mr-2" />
                Add New Property
              </Button>
            </Link>
            <Link to="/list-property?type=shortlet">
              <Button className="bg-secondary-600 hover:bg-secondary-700">
                <Plus className="w-4 h-4 mr-2" />
                List Shortlet Apartment
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
              <Home className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{properties.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {properties.filter(p => p.status === 'active').length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Draft Properties</CardTitle>
              <Edit className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {properties.filter(p => p.status === 'draft').length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Featured Properties</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {properties.filter(p => p.isFeatured).length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rented Properties</CardTitle>
              <Home className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {properties.filter(p => p.status === 'rented').length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Properties Table */}
        <Card>
          <CardHeader>
            <CardTitle>Your Properties</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Property</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Bed/Bath</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Featured Status</TableHead>
                  <TableHead>Date Added</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {properties.map((property) => (
                  <TableRow key={property.id}>
                    <TableCell className="font-medium">{property.title}</TableCell>
                    <TableCell>{property.address}</TableCell>
                    <TableCell>${property.price.toLocaleString()}/month</TableCell>
                    <TableCell>{property.bedrooms}bd / {property.bathrooms}ba</TableCell>
                    <TableCell>
                      <span className={getStatusBadge(property.status)}>
                        {property.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      {getFeaturedStatusBadge(property.featuredRequestStatus, property.isFeatured)}
                    </TableCell>
                    <TableCell>{new Date(property.dateAdded).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleRequestFeatured(property)}
                          disabled={property.isFeatured}
                          className="text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50"
                        >
                          <Star className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeleteProperty(property.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {properties.length === 0 && (
              <div className="text-center py-8">
                <Home className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No properties yet</h3>
                <p className="text-gray-500 mb-4">Get started by adding your first property listing.</p>
                <Link to="/list-property">
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Your First Property
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <RequestFeaturedDialog
        open={featuredDialog.open}
        onOpenChange={(open) => setFeaturedDialog({ ...featuredDialog, open })}
        propertyId={featuredDialog.propertyId}
        propertyTitle={featuredDialog.propertyTitle}
        currentStatus={featuredDialog.currentStatus}
      />

      <Footer />
    </div>
  );
};

export default AgentDashboard;
