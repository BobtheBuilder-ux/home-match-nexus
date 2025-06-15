
import { updateProperty, deleteProperty } from '@/services/propertyService';
import { updateUserApprovalStatus } from '@/services/adminService';
import { updateFeaturedRequestStatus } from '@/services/featuredPropertyService';
import { Property } from '@/types/property';
import { UserProfile } from '@/services/userService';
import { FeaturedRequest } from '@/services/featuredPropertyService';

interface UseAdminDashboardHandlersProps {
  properties: Property[];
  setProperties: (properties: Property[]) => void;
  users: UserProfile[];
  setUsers: (users: UserProfile[]) => void;
  featuredRequests: FeaturedRequest[];
  setFeaturedRequests: (requests: FeaturedRequest[]) => void;
  toast: any;
}

export const useAdminDashboardHandlers = ({
  properties,
  setProperties,
  users,
  setUsers,
  featuredRequests,
  setFeaturedRequests,
  toast
}: UseAdminDashboardHandlersProps) => {
  
  const handlePropertyStatusChange = async (propertyId: string, status: 'available' | 'pending' | 'rented') => {
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
        u.id === userId ? { ...u, is_approved: true } : u
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
        u.id === userId ? { ...u, is_approved: false } : u
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
      await updateProperty(request.property_id, { is_featured: true });
      
      setFeaturedRequests(featuredRequests.map(r => 
        r.id === requestId ? { ...r, status: 'approved' } : r
      ));
      setProperties(properties.map(p => 
        p.id === request.property_id ? { ...p, is_featured: true } : p
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

  return {
    handlePropertyStatusChange,
    handleDeleteProperty,
    handleApproveAgent,
    handleRejectAgent,
    handleApproveFeaturedRequest,
    handleRejectFeaturedRequest
  };
};
