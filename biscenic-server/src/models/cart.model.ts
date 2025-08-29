import mongoose, { Schema } from 'mongoose';
import ICartDoc from '../interfaces/cart.interface';

const cartSchema = new Schema<ICartDoc>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
            },
        },
    ],
}, { timestamps: true });

const Cart = mongoose.model<ICartDoc>('Cart', cartSchema);
export default Cart;