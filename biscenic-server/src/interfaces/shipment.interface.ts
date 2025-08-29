import mongoose from 'mongoose';

export default interface IShipmentDoc extends mongoose.Document {
    order: mongoose.Types.ObjectId;
    user: mongoose.Types.ObjectId;
    shippingAddress: mongoose.Types.ObjectId;
    shippingProvider: string;
    trackingNumber: string;
    shippingStatus: 'pending' | 'shipped' | 'delivered';
    estimatedDeliveryDate: Date;
    shippingDate: Date;
    deliveredDate?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

