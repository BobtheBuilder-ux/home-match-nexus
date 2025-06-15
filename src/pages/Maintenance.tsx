
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MaintenanceTicketForm from '@/components/MaintenanceTicketForm';
import MaintenanceTicketsList from '@/components/MaintenanceTicketsList';
import { MaintenanceTicket } from '@/types/maintenance';
import { Plus, Wrench } from 'lucide-react';
import { toast } from 'sonner';

const Maintenance = () => {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Mock data - in real app, fetch from backend
  const [tickets, setTickets] = useState<MaintenanceTicket[]>([
    {
      id: '1',
      propertyId: 'prop1',
      tenantId: 'tenant1',
      title: 'Kitchen Faucet Leaking',
      description: 'The kitchen faucet has been dripping continuously for the past 3 days.',
      category: 'plumbing',
      priority: 'medium',
      status: 'open',
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z',
      comments: []
    }
  ]);

  const handleTicketSubmit = async (ticketData: Partial<MaintenanceTicket>) => {
    setLoading(true);
    
    try {
      // In real app, send to backend
      const newTicket: MaintenanceTicket = {
        id: Date.now().toString(),
        tenantId: 'current-user-id', // Get from auth context
        ...ticketData,
      } as MaintenanceTicket;
      
      setTickets(prev => [newTicket, ...prev]);
      setShowForm(false);
      toast.success('Maintenance request submitted successfully!');
    } catch (error) {
      toast.error('Failed to submit maintenance request');
    } finally {
      setLoading(false);
    }
  };

  const handleTicketClick = (ticket: MaintenanceTicket) => {
    console.log('Ticket clicked:', ticket);
    // Navigate to ticket detail page or open modal
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Maintenance</h1>
              <p className="text-gray-600">Report and track maintenance issues for your property</p>
            </div>
            <Button onClick={() => setShowForm(!showForm)}>
              <Plus className="w-4 h-4 mr-2" />
              New Request
            </Button>
          </div>

          {showForm && (
            <div className="mb-8">
              <MaintenanceTicketForm
                propertyId="current-property-id" // Get from context or props
                onSubmit={handleTicketSubmit}
                loading={loading}
              />
            </div>
          )}

          <Tabs defaultValue="my-tickets" className="space-y-4">
            <TabsList>
              <TabsTrigger value="my-tickets" className="flex items-center gap-2">
                <Wrench className="w-4 h-4" />
                My Tickets ({tickets.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="my-tickets">
              <MaintenanceTicketsList
                tickets={tickets}
                onTicketClick={handleTicketClick}
                loading={false}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Maintenance;
