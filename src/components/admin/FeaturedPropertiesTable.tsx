
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, X } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Property } from '@/types/property';

interface FeaturedPropertiesTableProps {
  properties: Property[];
  getAgentName: (agentId: string) => string;
  handleFeatureToggle: (propertyId: string, isFeatured: boolean) => void;
}

const FeaturedPropertiesTable: React.FC<FeaturedPropertiesTableProps> = ({
  properties,
  getAgentName,
  handleFeatureToggle
}) => {
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Property</TableHead>
              <TableHead>Agent</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Date Added</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {properties.filter(p => p.isFeatured).map((property) => (
              <TableRow key={property.id}>
                <TableCell className="font-medium">{property.title}</TableCell>
                <TableCell>{getAgentName(property.agentId)}</TableCell>
                <TableCell>${property.price}/month</TableCell>
                <TableCell>{new Date(property.dateAdded).toLocaleDateString()}</TableCell>
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
                      variant="outline"
                      size="sm"
                      onClick={() => handleFeatureToggle(property.id, true)}
                    >
                      <X className="w-4 h-4" />
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

export default FeaturedPropertiesTable;
