import OrderItem from '../models/orderItem.model';
import mongoose from 'mongoose';

/**
 * Create a new order item.
 * @param order - The ID of the order.
 * @param product - The ID of the product.
 * @param quantity - The quantity of the product.
 * @param price - The price of the product.
 * @returns Created order item.
 */
export const createOrderItem = async (order: string, product: string, quantity: number, price: number) => {
    const totalPrice = quantity * price;
    const orderItem = new OrderItem({ order, product, quantity, price, totalPrice });
    return await orderItem.save();
};

/**
 * Get all order items for a specific order.
 * @param orderId - The ID of the order.
 * @returns List of order items.
 */
export const getOrderItemsByOrder = async (orderId: string) => {
    return await OrderItem.find({ order: new mongoose.Types.ObjectId(orderId) }).populate('product').exec();
};

/**
 * Delete an order item.
 * @param id - The ID of the order item.
 */
export const deleteOrderItem = async (id: string) => {
    await OrderItem.findByIdAndDelete(id);
};