import mongoose from 'mongoose';
import {IUserDoc} from './user.interfaces';
import IOrderDoc from './order.interface';

export default interface IPaymentDoc extends mongoose.Document {
    user: IUserDoc['_id']; 
    order: IOrderDoc['_id']; 
    amount: number; 
    paymentMethod: string; 
    transactionId: string; 
    status: string; 
    createdAt: Date;
    updatedAt: Date;
}
