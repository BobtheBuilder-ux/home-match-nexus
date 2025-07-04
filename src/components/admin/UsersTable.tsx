
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Check, X } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { UserProfile } from '@/services/userService';

interface UsersTableProps {
  users: UserProfile[];
  getStatusColor: (status: string) => string;
  handleApproveAgent: (userId: string) => void;
  handleRejectAgent: (userId: string) => void;
}

const UsersTable: React.FC<UsersTableProps> = ({
  users,
  getStatusColor,
  handleApproveAgent,
  handleRejectAgent
}) => {
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.userId}>
                <TableCell className="font-medium">{user.displayName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize">
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  {user.role === 'agent' ? (
                    <Badge className={getStatusColor(user.isApproved ? 'approved' : 'pending')}>
                      {user.isApproved ? 'Approved' : 'Pending'}
                    </Badge>
                  ) : (
                    <Badge className={getStatusColor('active')}>Active</Badge>
                  )}
                </TableCell>
                <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>User Details</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium">Name</label>
                            <p className="text-sm text-gray-600">{user.displayName}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium">Email</label>
                            <p className="text-sm text-gray-600">{user.email}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium">Role</label>
                            <p className="text-sm text-gray-600 capitalize">{user.role}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium">Joined</label>
                            <p className="text-sm text-gray-600">{new Date(user.createdAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    {user.role === 'agent' && !user.isApproved && (
                      <>
                        <Button
                          size="sm"
                          onClick={() => handleApproveAgent(user.userId)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleRejectAgent(user.userId)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default UsersTable;
