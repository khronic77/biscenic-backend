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
exports.deleteOrderItem = exports.getOrderItemsByOrder = exports.createOrderItem = void 0;
const orderItem_model_1 = __importDefault(require("../models/orderItem.model"));
const mongoose_1 = __importDefault(require("mongoose"));
/**
 * Create a new order item.
 * @param order - The ID of the order.
 * @param product - The ID of the product.
 * @param quantity - The quantity of the product.
 * @param price - The price of the product.
 * @returns Created order item.
 */
const createOrderItem = (order, product, quantity, price) => __awaiter(void 0, void 0, void 0, function* () {
    const totalPrice = quantity * price;
    const orderItem = new orderItem_model_1.default({ order, product, quantity, price, totalPrice });
    return yield orderItem.save();
});
exports.createOrderItem = createOrderItem;
/**
 * Get all order items for a specific order.
 * @param orderId - The ID of the order.
 * @returns List of order items.
 */
const getOrderItemsByOrder = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield orderItem_model_1.default.find({ order: new mongoose_1.default.Types.ObjectId(orderId) }).populate('product').exec();
});
exports.getOrderItemsByOrder = getOrderItemsByOrder;
/**
 * Delete an order item.
 * @param id - The ID of the order item.
 */
const deleteOrderItem = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield orderItem_model_1.default.findByIdAndDelete(id);
});
exports.deleteOrderItem = deleteOrderItem;
//# sourceMappingURL=orderItem.services.js.map