
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Users,
  Home,
  Wrench,
  FileText,
  BarChart3,
  Settings,
  Star
} from 'lucide-react';

interface AdminTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

const AdminTabs: React.FC<AdminTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="space-y-6">
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
    </Tabs>
  );
};

export default AdminTabs;
