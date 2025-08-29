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
exports.ReviewService = void 0;
const reviews_model_1 = __importDefault(require("../models/reviews.model"));
const mongoose_1 = require("mongoose");
class ReviewService {
    getProductReviews(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield reviews_model_1.default.find({ productId: new mongoose_1.Types.ObjectId(productId) })
                .sort({ createdAt: -1 });
        });
    }
    createReview(reviewData) {
        return __awaiter(this, void 0, void 0, function* () {
            const review = new reviews_model_1.default(Object.assign(Object.assign({}, reviewData), { productId: new mongoose_1.Types.ObjectId(reviewData.productId), userId: new mongoose_1.Types.ObjectId(reviewData.userId) }));
            return yield review.save();
        });
    }
    getUserReviews(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield reviews_model_1.default.find({ userId: new mongoose_1.Types.ObjectId(userId) })
                .sort({ createdAt: -1 });
        });
    }
    deleteReview(reviewId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield reviews_model_1.default.deleteOne({
                _id: new mongoose_1.Types.ObjectId(reviewId),
                userId: new mongoose_1.Types.ObjectId(userId)
            });
            return result.deletedCount === 1;
        });
    }
}
exports.ReviewService = ReviewService;
//# sourceMappingURL=reviews.services.js.map