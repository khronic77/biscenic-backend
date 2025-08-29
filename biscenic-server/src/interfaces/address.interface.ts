import mongoose from 'mongoose';

export default interface IAddressDoc {
    user: mongoose.Types.ObjectId;
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    phoneNumber: string;
    isDefault: boolean;
}
