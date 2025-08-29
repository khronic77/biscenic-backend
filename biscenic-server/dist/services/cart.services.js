"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearCart = exports.removeFromCart = exports.getCartByUser = exports.addToCart = void 0;
const cart_model_1 = __importDefault(require("../models/cart.model"));
const product_model_1 = __importDefault(require("../models/product.model"));
const mongoose_1 = __importDefault(require("mongoose"));
/**
 * Add a product to the user's cart.
 * @param userId - The ID of the user.
 * @param productId - The ID of the product to add.
 * @param quantity - The quantity of the product to add.
 * @returns Updated cart document.
 */
const addToCart = (userId, productId, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.default.findById(productId);
    if (!product) {
        throw new Error('Product not found');
    }
    let cart = yield cart_model_1.default.findOne({ user: new mongoose_1.default.Types.ObjectId(userId) });
    if (!cart) {
        cart = new cart_model_1.default({
            user: new mongoose_1.default.Types.ObjectId(userId),
            items: [{ product: product._id, quantity }],
        });
        return yield cart.save();
    }
    const itemIndex = cart.items.findIndex((item) => item.product.toString() === product._id);
    if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
    }
    else {
        cart.items.push({ product: product._id, quantity });
    }
    return yield cart.save();
});
exports.addToCart = addToCart;
/**
 * Get the cart for a specific user.
 * @param userId - The ID of the user.
 * @returns The user's cart with populated product details.
 */
const getCartByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield cart_model_1.default.findOne({ user: new mongoose_1.default.Types.ObjectId(userId) }).populate('items.product').exec();
    if (!cart) {
        throw new Error('Cart not found');
    }
    return cart;
});
exports.getCartByUser = getCartByUser;
/**
 * Remove a product from the user's cart.
 * @param userId - The ID of the user.
 * @param productId - The ID of the product to remove.
 * @returns Updated cart document.
 */
const removeFromCart = (userId, productId) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield cart_model_1.default.findOne({ user: new mongoose_1.default.Types.ObjectId(userId) });
    if (!cart) {
        throw new Error('Cart not found');
    }
    cart.items = cart.items.filter(item => item.product.toString() !== new mongoose_1.default.Types.ObjectId(productId).toString());
    cart.items = cart.items.filter(items => items.product.toString() !== productId);
    return yield cart.save();
});
exports.removeFromCart = removeFromCart;
/**
 * Clear the user's cart.
 * @param userId - The ID of the user.
 * @returns The deleted cart document, if any.
 */
const clearCart = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield cart_model_1.default.findOneAndDelete({ user: new mongoose_1.default.Types.ObjectId(userId) }).exec();
    if (!cart) {
        throw new Error('Cart not found');
    }
    return cart;
});
exports.clearCart = clearCart;
//# sourceMappingURL=cart.services.js.map