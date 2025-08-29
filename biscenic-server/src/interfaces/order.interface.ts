import mongoose from 'mongoose';
import {IProductDoc} from './product.interfaces';
import {IUserDoc} from './user.interfaces';
import IPaymentDoc from './payment.interface';
import IShipmentDoc from './shipment.interface';

export default interface IOrderDoc extends mongoose.Document {
    user: IUserDoc['_id'];
    items: Array<{ 
        product: IProductDoc['_id'];
        quantity: number;
        price: number;
    }>;
    totalPrice: number;
    status: string;
    payment: IPaymentDoc['_id']; 
    shipment: IShipmentDoc['_id']; 
    createdAt: Date;
    updatedAt: Date;
}