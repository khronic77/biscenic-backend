import { Request, Response, NextFunction } from 'express';
import * as orderItemService from '../services/orderItem.services';

export const createOrderItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { order, product, quantity, price } = req.body;
        const orderItem = await orderItemService.createOrderItem(order, product, quantity, price);
        res.status(201).json({ message: 'Order item created successfully', data: orderItem, error: null });
    } catch (error) {
        next(error);
    }
};

export const getOrderItems = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { orderId } = req.params;
        const orderItems = await orderItemService.getOrderItemsByOrder(orderId);
        res.status(200).json({ message: 'Order items retrieved successfully', data: orderItems, error: null });
    } catch (error) {
        next(error);
    }
};

export const deleteOrderItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        await orderItemService.deleteOrderItem(id);
        res.status(200).json({ message: 'Order item deleted successfully', error: null });
    } catch (error) {
        next(error);
    }
};