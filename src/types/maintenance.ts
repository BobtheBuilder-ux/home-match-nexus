
export interface MaintenanceTicket {
  id: string;
  propertyId: string;
  tenantId: string;
  title: string;
  description: string;
  category: 'plumbing' | 'electrical' | 'heating' | 'appliances' | 'structural' | 'other';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'completed' | 'closed';
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
  images?: string[];
  comments: MaintenanceComment[];
}

export interface MaintenanceComment {
  id: string;
  ticketId: string;
  userId: string;
  userRole: 'tenant' | 'agent' | 'maintenance';
  comment: string;
  createdAt: string;
  images?: string[];
}
