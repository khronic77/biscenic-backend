import mongoose, { Schema, model } from 'mongoose';
import IOrderItemDoc from '../interfaces/orderItem.interface';

const orderItemSchema = new Schema<IOrderItemDoc>({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order', 
        required: true,
    },
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
    price: {
        type: Number,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

const OrderItem = mongoose.model<IOrderItemDoc>('OrderItem', orderItemSchema);

export default OrderItem;
