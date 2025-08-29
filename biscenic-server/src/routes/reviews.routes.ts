import express from 'express';
import { ReviewController } from '../controllers/reviews.controller';
import { protect, admin } from '../middleware/auth.middleware';

const router = express.Router();
const reviewController = new ReviewController();

router.get('/products/:productId/reviews', reviewController.getProductReviews);

router.post(
  '/products/:productId/reviews',
  protect,  
  reviewController.createReview
);
router.get(
  '/users/reviews',
  protect,  
  reviewController.getUserReviews
);
router.delete(
  '/reviews/:reviewId',
  protect,  
  reviewController.deleteReview
);

export default router;