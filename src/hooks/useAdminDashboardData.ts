
import { useState, useEffect } from 'react';
import { Property } from '@/types/property';
import { UserProfile } from '@/services/userService';
import { FeaturedRequest } from '@/services/featuredPropertyService';
import { getProperties } from '@/services/propertyService';
import { getUserProfiles } from '@/services/adminService';
import { getFeaturedRequests } from '@/services/featuredPropertyService';
import { useToast } from '@/hooks/use-toast';

export const useAdminDashboardData = () => {
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

  const stats = {
    totalProperties: properties.length,
    totalTenants: users.filter(u => u.role === 'customer').length,
    totalAgents: users.filter(u => u.role === 'agent').length,
    pendingAgents: users.filter(u => u.role === 'agent' && !u.isApproved).length,
    activeMaintenanceTickets: 8,
    pendingApplications: 12,
    monthlyRevenue: properties.reduce((sum, p) => sum + (p.price || 0), 0),
    pendingFeaturedRequests: featuredRequests.filter(r => r.status === 'pending').length
  };

  return {
    properties,
    setProperties,
    users,
    setUsers,
    featuredRequests,
    setFeaturedRequests,
    loading,
    stats,
    toast
  };
};
