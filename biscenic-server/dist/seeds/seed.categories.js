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
const category_model_1 = __importDefault(require("../models/category.model"));
const db_config_1 = __importDefault(require("../config/db.config"));
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
const seedCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_config_1.default)();
        console.log('Connected to MongoDB for category seeding');
        // Clear existing categories
        yield category_model_1.default.deleteMany({});
        console.log('Cleared existing categories');
        // Insert new categories
        const createdCategories = yield category_model_1.default.insertMany(categories);
        console.log(`Created ${createdCategories.length} categories:`);
        createdCategories.forEach(cat => console.log(`- ${cat.name}`));
        console.log('Category seeding completed successfully');
        yield mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding categories:', error);
        process.exit(1);
    }
});
// Run the seeding if this file is executed directly
if (require.main === module) {
    seedCategories();
}
exports.default = seedCategories;
//# sourceMappingURL=seed.categories.js.map