
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Trash2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Property } from '@/types/property';

interface PropertiesTableProps {
  properties: Property[];
  handlePropertyStatusChange: (propertyId: string, status: 'available' | 'rented' | 'pending') => void;
  handleDeleteProperty: (propertyId: string) => void;
}

const PropertiesTable: React.FC<PropertiesTableProps> = ({
  properties,
  handlePropertyStatusChange,
  handleDeleteProperty
}) => {
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {properties.map((property) => (
              <TableRow key={property.id}>
                <TableCell className="font-medium">{property.title}</TableCell>
                <TableCell>{property.location}</TableCell>
                <TableCell>₦{property.price.toLocaleString()}/year</TableCell>
                <TableCell>
                  <select
                    value={property.status || 'available'}
                    onChange={(e) => handlePropertyStatusChange(property.id, e.target.value as 'available' | 'rented' | 'pending')}
                    className="px-2 py-1 border rounded text-sm"
                  >
                    <option value="available">Available</option>
                    <option value="rented">Rented</option>
                    <option value="pending">Pending</option>
                  </select>
                </TableCell>
                <TableCell>
                  {property.is_featured ? (
                    <Badge variant="default" className="bg-yellow-100 text-yellow-800">Featured</Badge>
                  ) : (
                    <Badge variant="outline">Not Featured</Badge>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(`/property/${property.id}`, '_blank')}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteProperty(property.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
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

export default PropertiesTable;
