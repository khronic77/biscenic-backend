"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateReview = void 0;
const joi_1 = __importDefault(require("joi"));
const validateReview = (review) => {
    const schema = joi_1.default.object({
        rating: joi_1.default.number().min(1).max(5).required(),
        comment: joi_1.default.string().min(3).max(500).required()
    });
    return schema.validate(review);
};
exports.validateReview = validateReview;
//# sourceMappingURL=review.validator.js.map