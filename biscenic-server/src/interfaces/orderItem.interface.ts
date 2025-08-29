import mongoose from 'mongoose';
import { IProductDoc } from './product.interfaces';
import IOrderDoc from './order.interface';

export default interface IOrderItemDoc extends mongoose.Document {
    order: IOrderDoc['_id']; 
    product: IProductDoc['_id'];
    quantity: number;
    price: number; 
    totalPrice: number; 
    createdAt: Date;
    updatedAt: Date;
}