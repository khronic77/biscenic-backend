import Order from '../models/order.model';
import IOrderDoc from '../interfaces/order.interface';
import mongoose from 'mongoose';

export const createOrder = async (orderData: Partial<IOrderDoc>) => {
    try {
        const order = new Order(orderData);
        const savedOrder = await order.save();
        
        const populatedOrder = await Order.findById(savedOrder._id)
            .populate('user', '-password')
            .populate('orderItems.product')
            .exec();
            
        return populatedOrder as unknown as IOrderDoc;
    } catch (error: any) {
        throw new Error(`Failed to create order: ${error.message}`);
    }
};

export const getAllOrders = async (): Promise<IOrderDoc[]> => {
    try {
        const orders = await Order.find()
            .populate('user', '-password')
            .populate('orderItems.product')
            .sort({ createdAt: -1 })
            .exec();

        return orders as unknown as IOrderDoc[];
    } catch (error: any) {
        throw new Error(`Failed to fetch orders: ${error.message}`);
    }
};

export const getOrderById = async (orderId: string): Promise<IOrderDoc | null> => {
    try {
        const order = await Order.findById(orderId)
            .populate('user', '-password')
            .populate('orderItems.product')
            .exec();
        
        return order as unknown as IOrderDoc;
    } catch (error: any) {
        throw new Error(`Failed to fetch order: ${error.message}`);
    }
};

export const getOrdersByUser = async (userId: string): Promise<IOrderDoc[]> => {
    try {
        const orders = await Order.find({ user: new mongoose.Types.ObjectId(userId) })
            .populate('orderItems.product')
            .exec();

        return orders as unknown as IOrderDoc[];
    } catch (error: any) {
        throw new Error(`Failed to fetch user orders: ${error.message}`);
    }
};

export const updateOrderStatus = async (orderId: string, status: string): Promise<IOrderDoc | null> => {
    const updatedOrder = await Order.findByIdAndUpdate(
        orderId,
        { status },
        { new: true }
    )
    .populate('user', '-password')
    .populate('orderItems.product')
    .exec();
    
    return updatedOrder as unknown as IOrderDoc;
};

export const updateOrder = async (orderId: string, updateData: Partial<IOrderDoc>) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            orderId, 
            updateData, 
            { new: true }
        ).populate('user', '-password');
        
        return updatedOrder;
    } catch (error) {
        throw error;
    }
};

export const deleteOrder = async (orderId: string): Promise<IOrderDoc | null> => {
    const deletedOrder = await Order.findByIdAndDelete(orderId).exec();
    return deletedOrder as unknown as IOrderDoc;
};
