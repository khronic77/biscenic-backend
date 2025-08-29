import Joi from 'joi';

export const validateReview = (review: any) => {
  const schema = Joi.object({
    rating: Joi.number().min(1).max(5).required(),
    comment: Joi.string().min(3).max(500).required()
  });

  return schema.validate(review);
};