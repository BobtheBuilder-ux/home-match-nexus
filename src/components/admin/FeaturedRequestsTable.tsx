
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Eye } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { FeaturedRequest } from '@/services/featuredPropertyService';

interface FeaturedRequestsTableProps {
  requests: FeaturedRequest[];
  onApprove: (requestId: string) => void;
  onReject: (requestId: string) => void;
  getAgentName: (agentId: string) => string;
}

const FeaturedRequestsTable: React.FC<FeaturedRequestsTableProps> = ({
  requests,
  onApprove,
  onReject,
  getAgentName
}) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="text-yellow-600">Pending</Badge>;
      case 'approved':
        return <Badge variant="default" className="bg-green-100 text-green-800">Approved</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Featured Property Requests</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Property</TableHead>
              <TableHead>Agent</TableHead>
              <TableHead>Request Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell className="font-medium">{request.property_title}</TableCell>
                <TableCell>{getAgentName(request.agent_id!)}</TableCell>
                <TableCell>{new Date(request.requested_at).toLocaleDateString()}</TableCell>
                <TableCell>{getStatusBadge(request.status!)}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(`/property/${request.property_id}`, '_blank')}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    {request.status === 'pending' && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onApprove(request.id!)}
                          className="text-green-600 hover:text-green-700 hover:bg-green-50"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onReject(request.id!)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <XCircle className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {requests.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No featured requests found.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FeaturedRequestsTable;
