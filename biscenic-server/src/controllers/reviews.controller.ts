import { Request, Response } from 'express';
import { ReviewService } from '../services/reviews.services';
import { validateReview } from '../utils/review.validator';

export class ReviewController {
  private reviewService: ReviewService;

  constructor() {
    this.reviewService = new ReviewService();
    // Bind methods to instance
    this.getProductReviews = this.getProductReviews.bind(this);
    this.createReview = this.createReview.bind(this);
    this.getUserReviews = this.getUserReviews.bind(this);
    this.deleteReview = this.deleteReview.bind(this);
  }

  async getProductReviews(req: Request, res: Response): Promise<void> {
    try {
      const { productId } = req.params;
      const reviews = await this.reviewService.getProductReviews(productId);
      res.json({ success: true, data: reviews });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to fetch reviews' });
    }
  }

  async createReview(req: Request, res: Response): Promise<void> {
    try {
      const { error } = validateReview(req.body);
      if (error) {
        res.status(400).json({ success: false, error: error.details[0].message });
        return;
      }

      const { productId } = req.params;
      const userId = req.user?._id;
      const username = req.user?.username;
      
      const review = await this.reviewService.createReview({
        ...req.body,
        productId,
        userId,
        username
      });

      res.status(201).json({ success: true, data: review });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to create review' });
    }
  }

  async getUserReviews(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?._id?.toString();
      if (!userId) {
        res.status(401).json({ success: false, error: 'User not authenticated' });
        return;
      }
      const reviews = await this.reviewService.getUserReviews(userId);
      res.json({ success: true, data: reviews });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to fetch user reviews' });
    }
  }

  async deleteReview(req: Request, res: Response): Promise<void> {
    try {
      const { reviewId } = req.params;
      const userId = req.user?._id?.toString();
      if (!userId) {
        res.status(401).json({ success: false, error: 'User not authenticated' });
        return;
      }
      
      const deleted = await this.reviewService.deleteReview(reviewId, userId);
      if (!deleted) {
        res.status(404).json({ success: false, error: 'Review not found' });
        return;
      }

      res.json({ success: true, message: 'Review deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to delete review' });
    }
  }
}