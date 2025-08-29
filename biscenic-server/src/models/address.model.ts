import mongoose, { Schema, Document } from 'mongoose';

export interface IAddressDoc extends Document {
    user: mongoose.Types.ObjectId;
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    phoneNumber: string;
    isDefault: boolean;
}

const AddressSchema = new Schema<IAddressDoc>(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
        zipCode: { type: String, required: true },
        phoneNumber: { type: String, required: true },
        isDefault: { type: Boolean, default: false },
    },
    { timestamps: true }
);

const Address = mongoose.model<IAddressDoc>('Address', AddressSchema);
export default Address;
