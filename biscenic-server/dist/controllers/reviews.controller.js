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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewController = void 0;
const reviews_services_1 = require("../services/reviews.services");
const review_validator_1 = require("../utils/review.validator");
class ReviewController {
    constructor() {
        this.reviewService = new reviews_services_1.ReviewService();
        // Bind methods to instance
        this.getProductReviews = this.getProductReviews.bind(this);
        this.createReview = this.createReview.bind(this);
        this.getUserReviews = this.getUserReviews.bind(this);
        this.deleteReview = this.deleteReview.bind(this);
    }
    getProductReviews(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { productId } = req.params;
                const reviews = yield this.reviewService.getProductReviews(productId);
                res.json({ success: true, data: reviews });
            }
            catch (error) {
                res.status(500).json({ success: false, error: 'Failed to fetch reviews' });
            }
        });
    }
    createReview(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const { error } = (0, review_validator_1.validateReview)(req.body);
                if (error) {
                    res.status(400).json({ success: false, error: error.details[0].message });
                    return;
                }
                const { productId } = req.params;
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
                const username = (_b = req.user) === null || _b === void 0 ? void 0 : _b.username;
                const review = yield this.reviewService.createReview(Object.assign(Object.assign({}, req.body), { productId,
                    userId,
                    username }));
                res.status(201).json({ success: true, data: review });
            }
            catch (error) {
                res.status(500).json({ success: false, error: 'Failed to create review' });
            }
        });
    }
    getUserReviews(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const userId = (_b = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id) === null || _b === void 0 ? void 0 : _b.toString();
                if (!userId) {
                    res.status(401).json({ success: false, error: 'User not authenticated' });
                    return;
                }
                const reviews = yield this.reviewService.getUserReviews(userId);
                res.json({ success: true, data: reviews });
            }
            catch (error) {
                res.status(500).json({ success: false, error: 'Failed to fetch user reviews' });
            }
        });
    }
    deleteReview(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const { reviewId } = req.params;
                const userId = (_b = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id) === null || _b === void 0 ? void 0 : _b.toString();
                if (!userId) {
                    res.status(401).json({ success: false, error: 'User not authenticated' });
                    return;
                }
                const deleted = yield this.reviewService.deleteReview(reviewId, userId);
                if (!deleted) {
                    res.status(404).json({ success: false, error: 'Review not found' });
                    return;
                }
                res.json({ success: true, message: 'Review deleted successfully' });
            }
            catch (error) {
                res.status(500).json({ success: false, error: 'Failed to delete review' });
            }
        });
    }
}
exports.ReviewController = ReviewController;
//# sourceMappingURL=reviews.controller.js.map