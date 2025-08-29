import seedCategories from './seed.categories';
import seedProducts from './seed.products';

const seedAll = async () => {
  try {
    console.log('🌱 Starting database seeding...');
    
    console.log('📂 Seeding categories...');
    await seedCategories();
    
    console.log('🛍️ Seeding products...');
    await seedProducts();
    
    console.log('✅ Database seeding completed successfully!');
    console.log('🎉 Your Biscenic store is now ready with sample data.');
    
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    process.exit(1);
  }
};

// Run the seeding if this file is executed directly
if (require.main === module) {
  seedAll();
}

export default seedAll;