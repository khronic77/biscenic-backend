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
const seed_categories_1 = __importDefault(require("./seed.categories"));
const seed_products_1 = __importDefault(require("./seed.products"));
const seedAll = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('🌱 Starting database seeding...');
        console.log('📂 Seeding categories...');
        yield (0, seed_categories_1.default)();
        console.log('🛍️ Seeding products...');
        yield (0, seed_products_1.default)();
        console.log('✅ Database seeding completed successfully!');
        console.log('🎉 Your Biscenic store is now ready with sample data.');
    }
    catch (error) {
        console.error('❌ Error during seeding:', error);
        process.exit(1);
    }
});
// Run the seeding if this file is executed directly
if (require.main === module) {
    seedAll();
}
exports.default = seedAll;
//# sourceMappingURL=seed.all.js.map