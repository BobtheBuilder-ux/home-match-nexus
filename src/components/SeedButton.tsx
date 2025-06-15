
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { seedDatabase, clearDatabase } from '@/scripts/seedDatabase';
import { toast } from 'sonner';
import { Loader2, Database, Trash2 } from 'lucide-react';

const SeedButton = () => {
  const [isSeeding, setIsSeeding] = useState(false);
  const [isClearing, setIsClearing] = useState(false);

  const handleSeed = async () => {
    setIsSeeding(true);
    try {
      await seedDatabase();
      toast.success('Database seeded successfully! 🌱');
    } catch (error) {
      console.error('Seeding error:', error);
      toast.error('Failed to seed database. Check console for details.');
    } finally {
      setIsSeeding(false);
    }
  };

  const handleClear = async () => {
    if (!confirm('Are you sure you want to clear all data? This cannot be undone!')) {
      return;
    }
    
    setIsClearing(true);
    try {
      await clearDatabase();
      toast.success('Database cleared successfully! 🧹');
    } catch (error) {
      console.error('Clearing error:', error);
      toast.error('Failed to clear database. Check console for details.');
    } finally {
      setIsClearing(false);
    }
  };

  return (
    <div className="flex gap-2">
      <Button
        onClick={handleSeed}
        disabled={isSeeding || isClearing}
        variant="outline"
        size="sm"
      >
        {isSeeding ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Seeding...
          </>
        ) : (
          <>
            <Database className="h-4 w-4 mr-2" />
            Seed Database
          </>
        )}
      </Button>
      
      <Button
        onClick={handleClear}
        disabled={isSeeding || isClearing}
        variant="destructive"
        size="sm"
      >
        {isClearing ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Clearing...
          </>
        ) : (
          <>
            <Trash2 className="h-4 w-4 mr-2" />
            Clear All
          </>
        )}
      </Button>
    </div>
  );
};

export default SeedButton;
