
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';
import { Property } from '@/types/property';
import { UserProfile } from '@/services/userService';

interface AdminOverviewCardsProps {
  properties: Property[];
  users: UserProfile[];
  handleApproveAgent: (userId: string) => void;
  handleRejectAgent: (userId: string) => void;
  getStatusColor: (status: string) => string;
}

const AdminOverviewCards: React.FC<AdminOverviewCardsProps> = ({
  properties,
  users,
  handleApproveAgent,
  handleRejectAgent,
  getStatusColor
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Recent Properties</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {properties.slice(0, 5).map((property) => (
              <div key={property.id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{property.title}</p>
                  <p className="text-sm text-gray-500">{property.location} • ₦{property.price.toLocaleString()}/year</p>
                </div>
                <Badge className={getStatusColor(property.status || 'available')}>
                  {property.status || 'available'}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pending Agent Approvals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users.filter(u => u.role === 'agent' && !u.is_approved).slice(0, 5).map((user) => (
              <div key={user.id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{user.display_name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleApproveAgent(user.id)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Check className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleRejectAgent(user.id)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminOverviewCards;
