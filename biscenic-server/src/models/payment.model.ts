import mongoose, { Schema, Document } from 'mongoose';

export interface IPayment extends Document {
    user: mongoose.Types.ObjectId;
    order: mongoose.Types.ObjectId;
    amount: number;
    paymentMethod: string;
    status: string;
    transactionReference: string; 
    createdAt?: Date;
    updatedAt?: Date;
}

const paymentSchema = new Schema<IPayment>(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        order: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order',
            required: true,
        },
        amount: {
            type: Number,
            required: true,
            min: 0,
        },
        paymentMethod: {
            type: String,
            enum: ['credit_card', 'paypal', 'bank_transfer', 'cash_on_delivery'],
            required: true,
        },
        status: {
            type: String,
            enum: ['pending', 'completed', 'failed'],
            default: 'pending',
        },
        transactionReference: {
            type: String,
            unique: true,
            required: true,
        },
    },
    { timestamps: true }
);

const Payment = mongoose.model<IPayment>('Payment', paymentSchema);
export default Payment;
