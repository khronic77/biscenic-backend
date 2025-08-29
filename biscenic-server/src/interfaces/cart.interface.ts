import mongoose from 'mongoose';
import { IProductDoc } from './product.interfaces';

export default interface ICartDoc extends mongoose.Document {
    user: mongoose.Types.ObjectId;
    items: { 
        product: mongoose.Types.ObjectId;
        quantity: number;
    }[];
    createdAt: Date;
    updatedAt: Date;
}