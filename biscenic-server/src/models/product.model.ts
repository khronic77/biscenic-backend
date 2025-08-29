import mongoose, { Schema, model } from 'mongoose';
import { IProductDoc } from '../interfaces/product.interfaces';

const productSchema = new Schema<IProductDoc>({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    images: [{
        url: {
            type: String,
            required: true,
        },
        publicId: {
            type: String,
            required: true,
        },
        isMain: {
            type: Boolean,
            default: false,
        }
    }],
}, { timestamps: true });

const Product = mongoose.model<IProductDoc>('Product', productSchema);
export default Product;