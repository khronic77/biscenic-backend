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
exports.updateProductImages = exports.createProductService = exports.findProductById = void 0;
const product_model_1 = __importDefault(require("../models/product.model"));
const upload_service_1 = require("../services/upload.service");
const findProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield product_model_1.default.findById(id);
    }
    catch (err) {
        throw new Error("Error finding product");
    }
});
exports.findProductById = findProductById;
const createProductService = (productData, files) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uploadPromises = files.map((file) => (0, upload_service_1.uploadImage)(file));
        const uploadedImages = yield Promise.all(uploadPromises);
        const images = uploadedImages.map((img, index) => (Object.assign(Object.assign({}, img), { isMain: index === 0 })));
        const product = new product_model_1.default(Object.assign(Object.assign({}, productData), { images }));
        return yield product.save();
    }
    catch (err) {
        if (err && productData.images) {
            yield Promise.all(productData.images.map((img) => (0, upload_service_1.deleteImage)(img.publicId)));
        }
        throw new Error(`Error creating product: ${err.message}`);
    }
});
exports.createProductService = createProductService;
const updateProductImages = (productId, files, existingImageIds) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_model_1.default.findById(productId);
        if (!product)
            return null;
        if (existingImageIds && existingImageIds.length > 0) {
            const imagesToDelete = product.images.filter((img) => existingImageIds.includes(img.publicId));
            yield Promise.all(imagesToDelete.map((img) => (0, upload_service_1.deleteImage)(img.publicId)));
            product.images = product.images.filter((img) => !existingImageIds.includes(img.publicId));
        }
        if (files && files.length > 0) {
            const uploadPromises = files.map((file) => (0, upload_service_1.uploadImage)(file));
            const uploadedImages = yield Promise.all(uploadPromises);
            const newImages = uploadedImages.map((img) => (Object.assign(Object.assign({}, img), { isMain: product.images.length === 0 })));
            product.images = [...product.images, ...newImages];
        }
        return yield product.save();
    }
    catch (err) {
        throw new Error("Error updating product images");
    }
});
exports.updateProductImages = updateProductImages;
//# sourceMappingURL=product.services.js.map