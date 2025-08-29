"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerErrorHandler = exports.uploadMiddleware = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const uploadDir = "uploads";
if (!fs_1.default.existsSync(uploadDir)) {
    fs_1.default.mkdirSync(uploadDir);
}
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        console.log("Multer destination:", {
            fieldname: file.fieldname,
            originalname: file.originalname,
            mimetype: file.mimetype,
        });
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path_1.default.extname(file.originalname));
    },
});
const upload = (0, multer_1.default)({
    storage: storage,
    limits: {
        fileSize: 15 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        console.log("Multer receiving file:", {
            fieldname: file.fieldname,
            originalname: file.originalname,
            mimetype: file.mimetype,
            size: file.size
        });
        const allowedTypes = /jpeg|jpg|png|webp/;
        const mimetype = allowedTypes.test(file.mimetype);
        const extname = allowedTypes.test(path_1.default.extname(file.originalname).toLowerCase());
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error("Only image files (jpeg, jpg, png, webp) are allowed!"));
    }
});
const uploadMiddleware = (req, res, next) => {
    console.log("Incoming request headers:", req.headers);
    const uploadArray = upload.array("images", 5);
    uploadArray(req, res, function (err) {
        console.log("Form data received:", req.body);
        console.log("Files received:", req.files);
        if (err instanceof multer_1.default.MulterError) {
            return res.status(400).json({
                message: `Upload error: ${err.message}`,
                error: true,
            });
        }
        else if (err) {
            return res.status(400).json({
                message: err.message,
                error: true,
            });
        }
        next();
    });
};
exports.uploadMiddleware = uploadMiddleware;
const multerErrorHandler = (err, req, res, next) => {
    console.error("Multer error:", err);
    if (err instanceof multer_1.default.MulterError) {
        return res.status(400).json({
            message: `Upload error: ${err.message}`,
            error: true,
        });
    }
    next(err);
};
exports.multerErrorHandler = multerErrorHandler;
//# sourceMappingURL=upload.middleware.js.map