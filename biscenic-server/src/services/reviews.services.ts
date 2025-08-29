import Review, { IReview } from '../models/reviews.model';
import { Types } from 'mongoose';

export class ReviewService {
  async getProductReviews(productId: string): Promise<IReview[]> {
    return await Review.find({ productId: new Types.ObjectId(productId) })
      .sort({ createdAt: -1 });
  }

  async createReview(reviewData: {
    productId: string;
    userId: string;
    username: string;
    rating: number;
    comment: string;
  }): Promise<IReview> {
    const review = new Review({
      ...reviewData,
      productId: new Types.ObjectId(reviewData.productId),
      userId: new Types.ObjectId(reviewData.userId)
    });
    return await review.save();
  }

  async getUserReviews(userId: string): Promise<IReview[]> {
    return await Review.find({ userId: new Types.ObjectId(userId) })
      .sort({ createdAt: -1 });
  }

  async deleteReview(reviewId: string, userId: string): Promise<boolean> {
    const result = await Review.deleteOne({
      _id: new Types.ObjectId(reviewId),
      userId: new Types.ObjectId(userId)
    });
    return result.deletedCount === 1;
  }
}