
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MaintenanceTicket } from '@/types/maintenance';
import { Calendar, MessageCircle, User, AlertTriangle } from 'lucide-react';

interface MaintenanceTicketsListProps {
  tickets: MaintenanceTicket[];
  onTicketClick: (ticket: MaintenanceTicket) => void;
  loading?: boolean;
}

const MaintenanceTicketsList = ({ tickets, onTicketClick, loading = false }: MaintenanceTicketsListProps) => {
  const getPriorityColor = (priority: MaintenanceTicket['priority']) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: MaintenanceTicket['status']) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="flex gap-2">
                <div className="h-6 bg-gray-200 rounded w-16"></div>
                <div className="h-6 bg-gray-200 rounded w-20"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (tickets.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Maintenance Tickets</h3>
          <p className="text-gray-500">No maintenance requests have been submitted yet.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {tickets.map((ticket) => (
        <Card key={ticket.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => onTicketClick(ticket)}>
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-semibold text-gray-900">{ticket.title}</h3>
              <div className="flex gap-2">
                <Badge className={getPriorityColor(ticket.priority)}>{ticket.priority}</Badge>
                <Badge className={getStatusColor(ticket.status)}>{ticket.status.replace('_', ' ')}</Badge>
              </div>
            </div>
            
            <p className="text-gray-600 mb-4 line-clamp-2">{ticket.description}</p>
            
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date(ticket.createdAt).toLocaleDateString()}</span>
              </div>
              
              <div className="flex items-center gap-1">
                <MessageCircle className="w-4 h-4" />
                <span>{ticket.comments.length} comments</span>
              </div>
              
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span className="capitalize">{ticket.category}</span>
              </div>
            </div>
            
            {ticket.assignedTo && (
              <div className="mt-2 text-sm text-blue-600">
                Assigned to: {ticket.assignedTo}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MaintenanceTicketsList;
