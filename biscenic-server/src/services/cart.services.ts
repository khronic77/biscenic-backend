import Cart from '../models/cart.model';
import Product from '../models/product.model';
import ICartDoc from '../interfaces/cart.interface';
import mongoose from 'mongoose';

/**
 * Add a product to the user's cart.
 * @param userId - The ID of the user.
 * @param productId - The ID of the product to add.
 * @param quantity - The quantity of the product to add.
 * @returns Updated cart document.
 */
export const addToCart = async (userId: string, productId: string, quantity: number): Promise<ICartDoc> => {
    const product = await Product.findById(productId);
    if (!product) {
        throw new Error('Product not found');
    }
    let cart = await Cart.findOne({ user: new mongoose.Types.ObjectId(userId) });
    if (!cart) {
        cart = new Cart({
            user: new mongoose.Types.ObjectId(userId), 
            items: [{ product: product._id as mongoose.Types.ObjectId, quantity }],
        });
        return await cart.save();
    }
    const itemIndex = cart.items.findIndex((item) =>
        item.product.toString() === product._id
    );
    if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
    } else {
        cart.items.push({ product: product._id as mongoose.Types.ObjectId, quantity });
    }

    return await cart.save();
};

/**
 * Get the cart for a specific user.
 * @param userId - The ID of the user.
 * @returns The user's cart with populated product details.
 */
export const getCartByUser = async (userId: string) => {
    const cart = await Cart.findOne({ user: new mongoose.Types.ObjectId(userId) }).populate('items.product').exec();

    if (!cart) {
        throw new Error('Cart not found');
    }
    return cart;
};

/**
 * Remove a product from the user's cart.
 * @param userId - The ID of the user.
 * @param productId - The ID of the product to remove.
 * @returns Updated cart document.
 */
export const removeFromCart = async (userId: string, productId: string) => {
    const cart = await Cart.findOne({ user: new mongoose.Types.ObjectId(userId) });
    if (!cart) {
        throw new Error('Cart not found');
    }
    cart.items = cart.items.filter(item =>
        item.product.toString() !== new mongoose.Types.ObjectId(productId).toString()
    );
    cart.items = cart.items.filter(items => items.product.toString()!== productId)
    return await cart.save(); 
};

/**
 * Clear the user's cart.
 * @param userId - The ID of the user.
 * @returns The deleted cart document, if any.
 */
export const clearCart = async (userId: string) => {
    const cart = await Cart.findOneAndDelete({ user: new mongoose.Types.ObjectId(userId) }).exec();
    if (!cart) {
        throw new Error('Cart not found');
    }
    return cart;
};