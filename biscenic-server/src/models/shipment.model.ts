import mongoose, { Schema, Document } from 'mongoose';

export interface IShipmentDoc extends Document {
    order: mongoose.Types.ObjectId;
    user: mongoose.Types.ObjectId;
    shippingAddress: mongoose.Types.ObjectId; 
    trackingNumber: string;
    shippingStatus: string;
    estimatedDeliveryDate: Date;
    shippingProvider: string;
    shippingDate: Date;
}

const ShipmentSchema = new Schema<IShipmentDoc>(
    {
        order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        shippingAddress: { type: mongoose.Schema.Types.ObjectId, ref: 'Address', required: true }, // Reference to Address
        trackingNumber: { type: String, required: true },
        shippingStatus: { type: String, enum: ['pending', 'shipped', 'delivered'], default: 'pending' },
        estimatedDeliveryDate: { type: Date, required: true },
        shippingProvider: { type: String, required: true },
        shippingDate: { type: Date, required: true },
    },
    { timestamps: true }
);

const Shipment = mongoose.model<IShipmentDoc>('Shipment', ShipmentSchema);
export default Shipment;


