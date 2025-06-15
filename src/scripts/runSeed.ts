
import { seedDatabase, clearDatabase } from './seedDatabase';

// Run the seed script
const runSeed = async () => {
  const shouldClear = process.argv.includes('--clear');
  
  try {
    if (shouldClear) {
      console.log('🧹 Clearing existing data...');
      await clearDatabase();
      console.log('');
    }
    
    console.log('🌱 Starting database seed...');
    await seedDatabase();
    console.log('');
    console.log('🎉 Seeding completed! Your database is now populated with sample data.');
    
  } catch (error) {
    console.error('💥 Seeding failed:', error);
    process.exit(1);
  }
};

// Only run if this file is executed directly
if (require.main === module) {
  runSeed();
}

export { runSeed };
