import mongoose, { Schema, model } from 'mongoose';
import { ICategoryDoc } from '../interfaces/category.interface';

const categorySchema = new Schema<ICategoryDoc>({
  name: {
    type: String,
    required: true,
    unique: true, 
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
}, { timestamps: true });

const Category = mongoose.model<ICategoryDoc>('Category', categorySchema);
export default Category;