import mongoose, { Schema } from 'mongoose';

const OrderSchema = new Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        shipment: { type: mongoose.Schema.Types.ObjectId, ref: 'Shipment', required: false },
        totalAmount: { type: Number, required: true },
        status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' },
        paymentMethod: { type: String, required: true },
        orderItems: [
            {
                product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
                quantity: { type: Number, required: true },
                price: { type: Number, required: true },
            },
        ],
    },
    { timestamps: true }
);

export default mongoose.model('Order', OrderSchema);