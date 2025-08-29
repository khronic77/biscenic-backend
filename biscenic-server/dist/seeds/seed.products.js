"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const product_model_1 = __importDefault(require("../models/product.model"));
const category_model_1 = __importDefault(require("../models/category.model"));
const db_config_1 = __importDefault(require("../config/db.config"));
const sampleProducts = [
    {
        name: 'Serenity Canvas - Abstract Meditation',
        description: 'A calming abstract painting that evokes tranquility and inner peace. Perfect for meditation spaces and quiet corners where reflection happens.',
        price: 299.99,
        stock: 15,
        categoryName: 'Paintings',
        images: [
            {
                url: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500',
                publicId: 'serenity_canvas_main',
                isMain: true
            }
        ]
    },
    {
        name: 'Mindful Moments Sculpture',
        description: 'A contemporary bronze sculpture that captures the essence of mindfulness. Its flowing lines invite contemplation and presence.',
        price: 899.99,
        stock: 8,
        categoryName: 'Sculptures',
        images: [
            {
                url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500',
                publicId: 'mindful_sculpture_main',
                isMain: true
            }
        ]
    },
    {
        name: 'Zen Garden Photography Series',
        description: 'A collection of three photographs capturing the serene beauty of Japanese zen gardens. Printed on museum-quality paper.',
        price: 199.99,
        stock: 25,
        categoryName: 'Photography',
        images: [
            {
                url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500',
                publicId: 'zen_garden_main',
                isMain: true
            }
        ]
    },
    {
        name: 'Harmony Lounge Chair',
        description: 'Ergonomically designed chair that promotes proper posture and comfort during meditation or reading. Crafted from sustainable materials.',
        price: 1299.99,
        stock: 12,
        categoryName: 'Seating',
        images: [
            {
                url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500',
                publicId: 'harmony_chair_main',
                isMain: true
            }
        ]
    },
    {
        name: 'Tranquil Waters Digital Art',
        description: 'A mesmerizing digital artwork that captures the flow of water in motion. Available as a high-resolution digital download.',
        price: 79.99,
        stock: 100,
        categoryName: 'Digital Art',
        images: [
            {
                url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500',
                publicId: 'tranquil_waters_main',
                isMain: true
            }
        ]
    },
    {
        name: 'Meditation Table - Bamboo',
        description: 'A low, minimalist table crafted from sustainable bamboo. Perfect for tea ceremonies, meditation practices, or as a coffee table.',
        price: 449.99,
        stock: 20,
        categoryName: 'Tables',
        images: [
            {
                url: 'https://images.unsplash.com/photo-1549497538-303791108f95?w=500',
                publicId: 'bamboo_table_main',
                isMain: true
            }
        ]
    },
    {
        name: 'Himalayan Salt Lamp - Large',
        description: 'A natural Himalayan salt lamp that purifies the air and creates a warm, soothing ambiance. Hand-carved and unique.',
        price: 89.99,
        stock: 30,
        categoryName: 'Lighting',
        images: [
            {
                url: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=500',
                publicId: 'salt_lamp_main',
                isMain: true
            }
        ]
    },
    {
        name: 'Mindfulness Storage Chest',
        description: 'A beautifully crafted wooden chest for storing meditation cushions, yoga props, or personal treasures. Features intricate carved details.',
        price: 329.99,
        stock: 15,
        categoryName: 'Storage',
        images: [
            {
                url: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=500',
                publicId: 'storage_chest_main',
                isMain: true
            }
        ]
    },
    {
        name: 'Aromatherapy Diffuser - Ultrasonic',
        description: 'A sleek ultrasonic diffuser that disperses essential oils while creating a gentle mist. Includes color-changing LED lights.',
        price: 129.99,
        stock: 40,
        categoryName: 'Wellness Collection',
        images: [
            {
                url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500',
                publicId: 'diffuser_main',
                isMain: true
            }
        ]
    },
    {
        name: 'Sound Healing Bowl Set',
        description: 'A set of three Tibetan singing bowls tuned to different frequencies for sound therapy and meditation practices.',
        price: 249.99,
        stock: 18,
        categoryName: 'Sensory Technology',
        images: [
            {
                url: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=500',
                publicId: 'singing_bowls_main',
                isMain: true
            }
        ]
    },
    {
        name: 'Sacred Geometry Wall Art',
        description: 'Laser-cut wooden wall art featuring sacred geometry patterns. Creates beautiful shadows and adds depth to any wall.',
        price: 179.99,
        stock: 22,
        categoryName: 'Art',
        images: [
            {
                url: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500',
                publicId: 'sacred_geometry_main',
                isMain: true
            }
        ]
    },
    {
        name: 'Meditation Cushion Set',
        description: 'A complete set of meditation cushions including a zafu and zabuton. Made from organic cotton with buckwheat hull filling.',
        price: 159.99,
        stock: 35,
        categoryName: 'Wellness Collection',
        images: [
            {
                url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500',
                publicId: 'meditation_cushions_main',
                isMain: true
            }
        ]
    }
];
const seedProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_config_1.default)();
        console.log('Connected to MongoDB for product seeding');
        // Clear existing products
        yield product_model_1.default.deleteMany({});
        console.log('Cleared existing products');
        // Get all categories to map names to IDs
        const categories = yield category_model_1.default.find({});
        const categoryMap = new Map();
        categories.forEach(cat => categoryMap.set(cat.name, cat._id));
        // Create products with proper category references
        const productsToCreate = sampleProducts.map(product => ({
            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock,
            category: categoryMap.get(product.categoryName),
            images: product.images
        }));
        const createdProducts = yield product_model_1.default.insertMany(productsToCreate);
        console.log(`Created ${createdProducts.length} products:`);
        createdProducts.forEach(product => console.log(`- ${product.name}`));
        console.log('Product seeding completed successfully');
        yield mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding products:', error);
        process.exit(1);
    }
});
// Run the seeding if this file is executed directly
if (require.main === module) {
    seedProducts();
}
exports.default = seedProducts;
//# sourceMappingURL=seed.products.js.map