
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Trash2, Star } from 'lucide-react';
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
  handlePropertyStatusChange: (propertyId: string, status: 'active' | 'draft' | 'rented') => void;
  handleDeleteProperty: (propertyId: string) => void;
  handleFeatureToggle: (propertyId: string, isFeatured: boolean) => void;
}

const PropertiesTable: React.FC<PropertiesTableProps> = ({
  properties,
  handlePropertyStatusChange,
  handleDeleteProperty,
  handleFeatureToggle
}) => {
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Address</TableHead>
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
                <TableCell>{property.address}, {property.city}</TableCell>
                <TableCell>${property.price}/month</TableCell>
                <TableCell>
                  <select
                    value={property.status || 'active'}
                    onChange={(e) => handlePropertyStatusChange(property.id, e.target.value as 'active' | 'draft' | 'rented')}
                    className="px-2 py-1 border rounded text-sm"
                  >
                    <option value="active">Active</option>
                    <option value="draft">Draft</option>
                    <option value="rented">Rented</option>
                  </select>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleFeatureToggle(property.id, property.isFeatured || false)}
                  >
                    {property.isFeatured ? <Star className="w-4 h-4 fill-current" /> : <Star className="w-4 h-4" />}
                  </Button>
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
