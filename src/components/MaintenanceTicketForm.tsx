
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MaintenanceTicket } from '@/types/maintenance';
import { toast } from 'sonner';
import FileUpload from './FileUpload';

interface MaintenanceTicketFormProps {
  propertyId: string;
  onSubmit: (ticket: Partial<MaintenanceTicket>) => void;
  loading?: boolean;
}

const MaintenanceTicketForm = ({ propertyId, onSubmit, loading = false }: MaintenanceTicketFormProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'other' as MaintenanceTicket['category'],
    priority: 'medium' as MaintenanceTicket['priority']
  });
  const [images, setImages] = useState<File[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.description.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    const ticketData: Partial<MaintenanceTicket> = {
      ...formData,
      propertyId,
      status: 'open',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      comments: []
    };

    onSubmit(ticketData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Report Maintenance Issue</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Issue Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Brief description of the issue"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="plumbing">Plumbing</SelectItem>
                  <SelectItem value="electrical">Electrical</SelectItem>
                  <SelectItem value="heating">Heating/AC</SelectItem>
                  <SelectItem value="appliances">Appliances</SelectItem>
                  <SelectItem value="structural">Structural</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Detailed Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Please provide detailed information about the issue, including when it started and any relevant circumstances"
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Photos (Optional)</Label>
            <FileUpload
              onFileSelect={setImages}
              acceptedTypes=".jpg,.jpeg,.png,.gif"
              maxFiles={5}
              maxSizeMB={5}
              category="maintenance photos"
              disabled={loading}
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Maintenance Request'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default MaintenanceTicketForm;
