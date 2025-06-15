
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdminDashboardContent from '@/components/admin/AdminDashboardContent';
import { useAdminDashboardData } from '@/hooks/useAdminDashboardData';
import { useAdminDashboardHandlers } from '@/hooks/useAdminDashboardHandlers';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  const {
    properties,
    setProperties,
    users,
    setUsers,
    featuredRequests,
    setFeaturedRequests,
    loading,
    stats,
    toast
  } = useAdminDashboardData();

  const handlers = useAdminDashboardHandlers({
    properties,
    setProperties,
    users,
    setUsers,
    featuredRequests,
    setFeaturedRequests,
    toast
  });

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
        <AdminDashboardContent
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          properties={properties}
          users={users}
          featuredRequests={featuredRequests}
          stats={stats}
          handlers={handlers}
        />
      </div>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
