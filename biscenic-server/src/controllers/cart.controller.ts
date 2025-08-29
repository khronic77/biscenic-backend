import { Request, Response, NextFunction } from 'express';
import * as cartService from '../services/cart.services';

export const addToCart = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { userId, productId, quantity } = req.body;
        const updatedCart = await cartService.addToCart(userId, productId, quantity);
        res.status(200).json({ message: 'Item added to cart successfully', data: updatedCart, error: null });
    } catch (error) {
        next(error);
    }
};

export const getCart = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { userId } = req.params;
        const cart = await cartService.getCartByUser(userId);
        res.status(200).json({ message: 'Cart fetched successfully', data: cart, error: null });
    } catch (error) {
        next(error);
    }
};

export const removeFromCart = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { userId, productId } = req.body;
        const updatedCart = await cartService.removeFromCart(userId, productId);
        res.status(200).json({ message: 'Item removed from cart successfully', data: updatedCart, error: null });
    } catch (error) {
        next(error);
    }
};

export const clearCart = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { userId } = req.params;
        await cartService.clearCart(userId);
        res.status(200).json({ message: 'Cart cleared successfully', data: null, error: null });
    } catch (error) {
        next(error);
    }
};