
import { seedDatabase, clearDatabase } from './seedDatabase';

// Run the seed script
const runSeed = async () => {
  const args = process.argv.slice(2);
  const shouldClear = args.includes('--clear') || args.includes('-c');
  const skipConfirmation = args.includes('--yes') || args.includes('-y');
  
  try {
    console.log('🚀 Rental Property Database Seeder');
    console.log('==================================\n');
    
    if (shouldClear) {
      if (!skipConfirmation) {
        console.log('⚠️  WARNING: This will clear all existing data!');
        console.log('   - All properties will be deleted');
        console.log('   - All applications will be deleted');
        console.log('   - All payments will be deleted');
        console.log('   - All featured requests will be deleted\n');
        
        // In a real CLI environment, you would use readline or similar
        // For this seed script, we'll proceed with clearing
      }
      
      console.log('🧹 Clearing existing data...');
      await clearDatabase();
      console.log('');
    }
    
    console.log('🌱 Starting database seed...');
    console.log('This will create:');
    console.log('  • 75 diverse rental properties');
    console.log('  • Multiple property types (apartments, houses, studios, etc.)');
    console.log('  • Properties across 23+ Abuja locations');
    console.log('  • Realistic pricing in Nigerian Naira');
    console.log('  • Property amenities and features');
    console.log('  • Sample applications for testing');
    console.log('');
    
    await seedDatabase();
    
    console.log('\n🎉 Seeding completed successfully!');
    console.log('\n📝 Next steps:');
    console.log('  1. Visit /find-rentals to browse properties');
    console.log('  2. Use the admin dashboard to manage listings');
    console.log('  3. Test the search and filter functionality');
    console.log('  4. Try applying to properties');
    
  } catch (error) {
    console.error('\n💥 Seeding failed:', error);
    console.log('\n🔧 Troubleshooting:');
    console.log('  • Check your Supabase connection');
    console.log('  • Verify database tables exist');
    console.log('  • Ensure proper permissions are set');
    process.exit(1);
  }
};

// Only run if this file is executed directly
if (require.main === module) {
  runSeed();
}

export { runSeed };
