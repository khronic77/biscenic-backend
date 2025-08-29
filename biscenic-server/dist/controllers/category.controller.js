"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategoryController = exports.updateCategoryController = exports.getCategoryByIdController = exports.getAllCategoriesController = exports.createCategoryController = void 0;
const categoryService = __importStar(require("../services/category.services"));
const createCategoryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryData = {
            name: req.body.name,
            description: req.body.description,
        };
        if (!categoryData.name || !categoryData.description) {
            res.status(400).json({
                message: "Name and description are required",
                data: null,
                error: "Missing required fields",
            });
            return;
        }
        const category = yield categoryService.createCategory(categoryData);
        res.status(201).json({
            message: "Category created successfully",
            data: category,
            error: null,
        });
    }
    catch (err) {
        console.error("Category controller error:", err);
        res.status(500).json({
            message: "Error creating category",
            data: null,
            error: err.message || "Internal Server Error",
        });
    }
});
exports.createCategoryController = createCategoryController;
const getAllCategoriesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield categoryService.getAllCategories();
        res.status(200).json({
            message: "All categories fetched successfully",
            data: categories,
            error: null,
        });
    }
    catch (err) {
        res.status(500).json({
            message: "Error fetching all categories",
            data: null,
            error: err.message || "Internal Server Error",
        });
    }
});
exports.getAllCategoriesController = getAllCategoriesController;
const getCategoryByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield categoryService.getCategoryById(req.params.id);
        if (!category) {
            res.status(404).json({
                message: "Category not found",
                data: null,
                error: "Category not found",
            });
            return;
        }
        res.status(200).json({
            message: "Category fetched successfully",
            data: category,
            error: null,
        });
    }
    catch (err) {
        res.status(500).json({
            message: "Error fetching category by ID",
            data: null,
            error: err.message || "Internal Server Error",
        });
    }
});
exports.getCategoryByIdController = getCategoryByIdController;
const updateCategoryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield categoryService.updateCategory(req.params.id, req.body);
        if (!category) {
            res.status(404).json({
                message: "Category not found",
                data: null,
                error: "Category not found",
            });
            return;
        }
        res.status(200).json({
            message: "Category updated successfully",
            data: category,
            error: null,
        });
    }
    catch (err) {
        res.status(500).json({
            message: "Error updating category",
            data: null,
            error: err.message || "Internal Server Error",
        });
    }
});
exports.updateCategoryController = updateCategoryController;
const deleteCategoryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield categoryService.deleteCategory(req.params.id);
        if (!category) {
            res.status(404).json({
                message: "Category not found",
                data: null,
                error: "Category not found",
            });
            return;
        }
        res.status(200).json({
            message: "Category deleted successfully",
            data: null,
            error: null,
        });
    }
    catch (err) {
        res.status(500).json({
            message: "Error deleting category",
            data: null,
            error: err.message || "Internal Server Error",
        });
    }
});
exports.deleteCategoryController = deleteCategoryController;
//# sourceMappingURL=category.controller.js.map