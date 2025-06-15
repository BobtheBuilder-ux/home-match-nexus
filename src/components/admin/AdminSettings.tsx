
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Save } from 'lucide-react';

const AdminSettings: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Platform Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Platform Name</label>
            <Input defaultValue="HomeMatch" />
          </div>
          <div>
            <label className="text-sm font-medium">Support Email</label>
            <Input defaultValue="support@homematch.com" />
          </div>
          <div>
            <label className="text-sm font-medium">Commission Rate (%)</label>
            <Input type="number" defaultValue="5" />
          </div>
          <Button>
            <Save className="w-4 h-4 mr-2" />
            Save Settings
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Email Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">SMTP Server</label>
            <Input placeholder="smtp.gmail.com" />
          </div>
          <div>
            <label className="text-sm font-medium">SMTP Port</label>
            <Input type="number" placeholder="587" />
          </div>
          <div>
            <label className="text-sm font-medium">From Email</label>
            <Input placeholder="noreply@homematch.com" />
          </div>
          <Button>
            <Save className="w-4 h-4 mr-2" />
            Save Email Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSettings;
