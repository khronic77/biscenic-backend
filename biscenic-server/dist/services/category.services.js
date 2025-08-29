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
exports.deleteCategory = exports.updateCategory = exports.getCategoryById = exports.getAllCategories = exports.createCategory = void 0;
const category_model_1 = __importDefault(require("../models/category.model"));
const createCategory = (categoryData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingCategory = yield category_model_1.default.findOne({
            name: { $regex: new RegExp(`^${categoryData.name}$`, "i") },
        });
        if (existingCategory) {
            throw new Error("Category with this name already exists");
        }
        const category = new category_model_1.default(categoryData);
        return yield category.save();
    }
    catch (err) {
        console.error("Category creation error:", err);
        throw new Error(err.message || "Error creating category");
    }
});
exports.createCategory = createCategory;
const getAllCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield category_model_1.default.find();
    }
    catch (err) {
        throw new Error("Error fetching categories");
    }
});
exports.getAllCategories = getAllCategories;
const getCategoryById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield category_model_1.default.findById(id);
    }
    catch (err) {
        throw new Error("Error finding category");
    }
});
exports.getCategoryById = getCategoryById;
const updateCategory = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield category_model_1.default.findByIdAndUpdate(id, updateData, { new: true });
    }
    catch (err) {
        throw new Error("Error updating category");
    }
});
exports.updateCategory = updateCategory;
const deleteCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield category_model_1.default.findByIdAndDelete(id);
    }
    catch (err) {
        throw new Error("Error deleting category");
    }
});
exports.deleteCategory = deleteCategory;
//# sourceMappingURL=category.services.js.map