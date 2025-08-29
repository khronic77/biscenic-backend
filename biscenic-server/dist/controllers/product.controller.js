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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.getProductById = exports.getAllProducts = exports.updateProductImages = exports.updateProduct = exports.createProduct = void 0;
const product_model_1 = __importDefault(require("../models/product.model"));
const ProductService = __importStar(require("../services/product.services"));
const createProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        console.log("=== DEBUG REQUEST START ===");
        console.log("Headers:", req.headers);
        console.log("Body:", req.body);
        console.log("Files:", req.files);
        console.log("=== DEBUG REQUEST END ===");
        const uploadedFiles = req.files;
        const files = Array.isArray(uploadedFiles)
            ? uploadedFiles
            : (uploadedFiles === null || uploadedFiles === void 0 ? void 0 : uploadedFiles.images) || [];
        const rawData = req.body;
        const productData = {
            name: (_a = rawData.name) === null || _a === void 0 ? void 0 : _a.toString().trim(),
            description: (_b = rawData.description) === null || _b === void 0 ? void 0 : _b.toString().trim(),
            price: parseFloat(rawData.price),
            stock: parseInt(rawData.stock),
            category: (_c = rawData.category) === null || _c === void 0 ? void 0 : _c.toString().trim(),
        };
        console.log("Parsed product data:", productData);
        const validationErrors = {};
        if (!productData.name)
            validationErrors.name = "Name is required";
        if (!productData.description)
            validationErrors.description = "Description is required";
        if (!productData.price || isNaN(productData.price))
            validationErrors.price = "Valid price is required";
        if (!productData.stock || isNaN(productData.stock))
            validationErrors.stock = "Valid stock quantity is required";
        if (!productData.category)
            validationErrors.category = "Category is required";
        if (Object.keys(validationErrors).length > 0) {
            res.status(400).json({
                message: "All product fields are required and must be valid",
                error: true,
                missing: validationErrors,
            });
            return;
        }
        if (!files || files.length === 0) {
            res.status(400).json({
                message: "At least one product image is required",
                error: true,
            });
            return;
        }
        // Validate category exists
        const mongoose = require("mongoose");
        if (!mongoose.Types.ObjectId.isValid(productData.category)) {
            res.status(400).json({
                message: "Invalid category ID format",
                error: true,
            });
            return;
        }
        const newProduct = yield ProductService.createProductService(productData, files);
        res.status(201).json({
            message: "Product created successfully",
            error: false,
            data: Object.assign(Object.assign({}, newProduct.toObject()), { images: newProduct.images.map((img) => ({
                    url: img.url,
                    isMain: img.isMain,
                })) }),
        });
        return;
    }
    catch (error) {
        console.error("Product creation error:", error);
        console.error("Error stack:", error.stack);
        res.status(500).json({
            message: "Failed to create product",
            error: true,
            details: error.message,
            stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
        });
        return;
    }
});
exports.createProduct = createProduct;
const updateProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const files = req.files;
        const { name, description, price, stock, category, existingImageIds } = req.body;
        let updatedProduct;
        if (files && files.length > 0) {
            updatedProduct = yield ProductService.updateProductImages(id, files, existingImageIds);
        }
        updatedProduct = yield product_model_1.default.findByIdAndUpdate(id, Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, (name && { name })), (description && { description })), (price && { price })), (stock && { stock })), (category && { category })), { new: true, runValidators: true });
        if (!updatedProduct) {
            res.status(404).json({
                message: "Product not found",
                error: true,
            });
            return;
        }
        res.status(200).json({
            message: "Product updated successfully",
            error: false,
            data: updatedProduct,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to update product",
            error: true,
            details: error.message,
        });
    }
});
exports.updateProduct = updateProduct;
const updateProductImages = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { existingImageIds } = req.body;
        const files = req.files;
        const updatedProduct = yield ProductService.updateProductImages(id, files, existingImageIds);
        if (!updatedProduct) {
            res.status(404).json({
                message: "Product not found",
                error: true,
            });
            return;
        }
        res.status(200).json({
            message: "Product images updated successfully",
            data: updatedProduct,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateProductImages = updateProductImages;
const getAllProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_model_1.default.find().populate("category");
        res.status(200).json({
            message: "Products fetched successfully",
            data: products.map((product) => (Object.assign(Object.assign({}, product.toObject()), { images: product.images.map((img) => ({
                    url: img.url,
                    publicId: img.publicId,
                    isMain: img.isMain,
                })) }))),
            error: false,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllProducts = getAllProducts;
const getProductById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const product = yield product_model_1.default.findById(id).populate("category");
        if (!product) {
            res
                .status(404)
                .json({ message: "Product not found", data: null, error: true });
            return;
        }
        res.status(200).json({
            message: "Product fetched successfully",
            data: product,
            error: false,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getProductById = getProductById;
const deleteProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedProduct = yield product_model_1.default.findByIdAndDelete(id);
        if (!deletedProduct) {
            res.status(404).json({ message: "Product not found", error: true });
            return;
        }
        res.status(200).json({ message: "Product deleted successfully" });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteProduct = deleteProduct;
//# sourceMappingURL=product.controller.js.map