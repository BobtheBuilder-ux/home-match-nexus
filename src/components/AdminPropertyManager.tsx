
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Property } from "@/types/property";
import { getProperties, updateProperty, deleteProperty } from "@/services/propertyService";
import { useToast } from "@/hooks/use-toast";
import { Edit, Trash2, Eye, CheckCircle, XCircle } from "lucide-react";

const AdminPropertyManager = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const data = await getProperties();
      setProperties(data);
    } catch (error) {
      console.error('Error fetching properties:', error);
      toast({
        title: "Error",
        description: "Failed to fetch properties",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (propertyId: string, newStatus: 'available' | 'rented' | 'pending') => {
    try {
      await updateProperty(propertyId, { status: newStatus });
      setProperties(properties.map(p => 
        p.id === propertyId ? { ...p, status: newStatus } : p
      ));
      toast({
        title: "Status Updated",
        description: `Property status changed to ${newStatus}`,
      });
    } catch (error) {
      console.error('Error updating property status:', error);
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
        title: "Property Deleted",
        description: "Property has been successfully deleted",
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
      await updateProperty(propertyId, { is_featured: !isFeatured });
      setProperties(properties.map(p => 
        p.id === propertyId ? { ...p, is_featured: !isFeatured } : p
      ));
      toast({
        title: "Featured Status Updated",
        description: `Property ${!isFeatured ? 'added to' : 'removed from'} featured list`,
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

  if (loading) {
    return <div className="text-center py-8">Loading properties...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Property Management</h2>
        <Badge variant="secondary">{properties.length} Total Properties</Badge>
      </div>

      <div className="grid gap-4">
        {properties.map((property) => (
          <Card key={property.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{property.title}</CardTitle>
                  <p className="text-sm text-gray-600">{property.location}</p>
                </div>
                <div className="flex gap-2">
                  <Badge variant={property.status === 'available' ? 'default' : 'secondary'}>
                    {property.status}
                  </Badge>
                  {property.is_featured && (
                    <Badge variant="outline">Featured</Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  <p>₦{property.price.toLocaleString()}/year • {property.bedrooms} bed • {property.bathrooms} bath</p>
                  <p>Listed: {new Date(property.created_at).toLocaleDateString()}</p>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant='outline'
                    size="sm"
                    onClick={() => window.open(`/property/${property.id}`, '_blank')}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleFeatureToggle(property.id, property.is_featured || false)}
                  >
                    {property.is_featured ? <XCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                  </Button>

                  <select
                    value={property.status}
                    onChange={(e) => handleStatusChange(property.id, e.target.value as 'available' | 'rented' | 'pending')}
                    className="px-2 py-1 border rounded text-sm"
                  >
                    <option value="available">Available</option>
                    <option value="rented">Rented</option>
                    <option value="pending">Pending</option>
                  </select>

                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteProperty(property.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {properties.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No properties found.</p>
        </div>
      )}
    </div>
  );
};

export default AdminPropertyManager;
