import { Request, Response, NextFunction } from 'express';
import * as orderService from '../services/order.services';
import { IUserDoc } from '../interfaces/user.interfaces';

declare module 'express-serve-static-core' {
    interface Request {
        user?: IUserDoc;
    }
}

export const createOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const orderData = {
            ...req.body,
            user: req.user?._id
        };

        if (!orderData.orderItems || !Array.isArray(orderData.orderItems) || orderData.orderItems.length === 0) {
            res.status(400).json({
                message: 'Order must contain at least one item',
                error: true
            });
            return
        }

        const newOrder = await orderService.createOrder(orderData);
        res.status(201).json({
            message: 'Order created successfully',
            data: newOrder,
            error: false
        });
        return
    } catch (error) {
        next(error);
    }
};

export const getUserOrders = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { userId } = req.params;
        
        if (userId !== req.user?._id?.toString() && !req.user?.roles.includes('admin')) {
            res.status(403).json({
                message: 'Not authorized to view these orders',
                error: true
            });
            return;
        }

        const orders = await orderService.getOrdersByUser(userId);
        res.status(200).json({
            message: 'Orders fetched successfully',
            data: orders,
            error: false
        });
    } catch (error) {
        next(error);
    }
};

export const getOrderById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { orderId } = req.params;
        const order = await orderService.getOrderById(orderId);
        if (!order) {
            res.status(404).json({ message: 'Order not found', data: null, error: true });
            return;
        }
        res.status(200).json({ message: 'Order fetched successfully', data: order, error: null });
    } catch (error) {
        next(error);
    }
};

export const updateOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { orderId } = req.params;
        const updateData = req.body;
        
        const updatedOrder = await orderService.updateOrder(orderId, updateData);
        if (!updatedOrder) {
            res.status(404).json({ message: 'Order not found', data: null, error: true });
            return;
        }
        
        res.status(200).json({ 
            message: 'Order updated successfully', 
            data: updatedOrder, 
            error: null 
        });
    } catch (error) {
        next(error);
    }
};

export const updateOrderStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { orderId, status } = req.body;
        const updatedOrder = await orderService.updateOrderStatus(orderId, status);
        res.status(200).json({ message: 'Order status updated successfully', data: updatedOrder, error: null });
    } catch (error) {
        next(error);
    }
};

export const deleteOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { orderId } = req.params;
        const deletedOrder = await orderService.deleteOrder(orderId);
        res.status(200).json({ message: 'Order deleted successfully', data: deletedOrder, error: null });
    } catch (error) {
        next(error);
    }
};


export const getAllOrders = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const orders = await orderService.getAllOrders();
        res.status(200).json({ message: 'Orders fetched successfully', data: orders, error: null });
    } catch (error) {
        next(error);
    }
};