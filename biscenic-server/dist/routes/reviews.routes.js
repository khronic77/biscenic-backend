"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reviews_controller_1 = require("../controllers/reviews.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
const reviewController = new reviews_controller_1.ReviewController();
router.get('/products/:productId/reviews', reviewController.getProductReviews);
router.post('/products/:productId/reviews', auth_middleware_1.protect, reviewController.createReview);
router.get('/users/reviews', auth_middleware_1.protect, reviewController.getUserReviews);
router.delete('/reviews/:reviewId', auth_middleware_1.protect, reviewController.deleteReview);
exports.default = router;
//# sourceMappingURL=reviews.routes.js.map