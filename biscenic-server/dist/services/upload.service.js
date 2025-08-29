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
exports.updateImage = exports.deleteImage = exports.uploadImage = void 0;
const cloudinary_1 = require("cloudinary");
const promises_1 = __importDefault(require("fs/promises"));
// Validate environment variables
const requiredEnvVars = [
    'CLOUDINARY_CLOUD_NAME',
    'CLOUDINARY_API_KEY',
    'CLOUDINARY_API_SECRET'
];
requiredEnvVars.forEach(envVar => {
    if (!process.env[envVar]) {
        throw new Error(`Missing required environment variable: ${envVar}`);
    }
});
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const ALLOWED_FORMATS = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const uploadImage = (file) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // Validate file
        if (!file) {
            throw new Error('No file provided');
        }
        if (!ALLOWED_FORMATS.includes(file.mimetype)) {
            throw new Error('Invalid file format. Only JPEG, PNG, and WebP are allowed');
        }
        if (file.size > MAX_FILE_SIZE) {
            throw new Error('File size exceeds 5MB limit');
        }
        const result = yield cloudinary_1.v2.uploader.upload(file.path, {
            folder: "biscenic/products",
            use_filename: true,
            unique_filename: true,
            resource_type: "auto",
            transformation: [
                { width: 1000, height: 1000, crop: "limit" },
                { quality: "auto:best" },
                { fetch_format: "auto" },
                { strip: true }, // Remove metadata
                { dpr: "auto" }, // Automatic device pixel ratio
            ],
            eager: [
                // Generate thumbnails
                { width: 200, height: 200, crop: "fill", format: "webp" },
                { width: 400, height: 400, crop: "fill", format: "webp" },
            ],
            eager_async: true,
        });
        // Clean up the temporary file
        yield promises_1.default.unlink(file.path).catch(err => console.error(`Failed to delete temporary file ${file.path}:`, err));
        return {
            url: result.secure_url,
            publicId: result.public_id,
            thumbnails: ((_a = result.eager) === null || _a === void 0 ? void 0 : _a.map((img) => img.secure_url)) || [],
        };
    }
    catch (error) {
        // Try to clean up the temporary file even if upload failed
        yield promises_1.default.unlink(file.path).catch(err => console.error(`Failed to delete temporary file ${file.path}:`, err));
        throw new Error(`Failed to upload image: ${error.message}`);
    }
});
exports.uploadImage = uploadImage;
const deleteImage = (publicId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!publicId) {
            throw new Error('No publicId provided');
        }
        const result = yield cloudinary_1.v2.uploader.destroy(publicId);
        if (result.result !== 'ok') {
            throw new Error(`Failed to delete image: ${result.result}`);
        }
    }
    catch (error) {
        throw new Error(`Failed to delete image: ${error.message}`);
    }
});
exports.deleteImage = deleteImage;
const updateImage = (publicId, file) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!publicId) {
            throw new Error('No publicId provided');
        }
        const deleteResult = yield cloudinary_1.v2.uploader.destroy(publicId);
        if (deleteResult.result !== 'ok') {
            throw new Error('Failed to delete existing image');
        }
        return yield (0, exports.uploadImage)(file);
    }
    catch (error) {
        throw new Error(`Failed to update image: ${error.message}`);
    }
});
exports.updateImage = updateImage;
//# sourceMappingURL=upload.service.js.map