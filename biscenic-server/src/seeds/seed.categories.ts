import mongoose from 'mongoose';
import Category from '../models/category.model';
import connectDB from '../config/db.config';

const categories = [
  {
    name: 'Art',
    description: 'Curated artworks that transform spaces into sanctuaries of beauty and inspiration'
  },
  {
    name: 'Paintings',
    description: 'Original paintings and fine art prints that speak to the soul'
  },
  {
    name: 'Sculptures',
    description: 'Three-dimensional art pieces that add depth and character to any environment'
  },
  {
    name: 'Digital Art',
    description: 'Contemporary digital artworks for the modern aesthetic'
  },
  {
    name: 'Photography',
    description: 'Stunning photographic works that capture moments of transcendence'
  },
  {
    name: 'Furniture',
    description: 'Thoughtfully designed furniture that merges form, function, and mindfulness'
  },
  {
    name: 'Seating',
    description: 'Comfortable seating solutions for contemplation and relaxation'
  },
  {
    name: 'Tables',
    description: 'Elegant tables for gathering, working, and creating'
  },
  {
    name: 'Storage',
    description: 'Beautiful storage solutions that maintain harmony and organization'
  },
  {
    name: 'Lighting',
    description: 'Illumination that creates ambiance and enhances well-being'
  },
  {
    name: 'Wellness Collection',
    description: 'Products designed to enhance physical and mental well-being'
  },
  {
    name: 'Sensory Technology',
    description: 'Innovative technology that engages the senses for therapeutic benefit'
  }
];

const seedCategories = async () => {
  try {
    await connectDB();
    console.log('Connected to MongoDB for category seeding');

    // Clear existing categories
    await Category.deleteMany({});
    console.log('Cleared existing categories');

    // Insert new categories
    const createdCategories = await Category.insertMany(categories);
    console.log(`Created ${createdCategories.length} categories:`);
    createdCategories.forEach(cat => console.log(`- ${cat.name}`));

    console.log('Category seeding completed successfully');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding categories:', error);
    process.exit(1);
  }
};

// Run the seeding if this file is executed directly
if (require.main === module) {
  seedCategories();
}

export default seedCategories;