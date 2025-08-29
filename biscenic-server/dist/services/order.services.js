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
exports.deleteOrder = exports.updateOrder = exports.updateOrderStatus = exports.getOrdersByUser = exports.getOrderById = exports.getAllOrders = exports.createOrder = void 0;
const order_model_1 = __importDefault(require("../models/order.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const createOrder = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = new order_model_1.default(orderData);
        const savedOrder = yield order.save();
        const populatedOrder = yield order_model_1.default.findById(savedOrder._id)
            .populate('user', '-password')
            .populate('orderItems.product')
            .exec();
        return populatedOrder;
    }
    catch (error) {
        throw new Error(`Failed to create order: ${error.message}`);
    }
});
exports.createOrder = createOrder;
const getAllOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield order_model_1.default.find()
            .populate('user', '-password')
            .populate('orderItems.product')
            .sort({ createdAt: -1 })
            .exec();
        return orders;
    }
    catch (error) {
        throw new Error(`Failed to fetch orders: ${error.message}`);
    }
});
exports.getAllOrders = getAllOrders;
const getOrderById = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield order_model_1.default.findById(orderId)
            .populate('user', '-password')
            .populate('orderItems.product')
            .exec();
        return order;
    }
    catch (error) {
        throw new Error(`Failed to fetch order: ${error.message}`);
    }
});
exports.getOrderById = getOrderById;
const getOrdersByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield order_model_1.default.find({ user: new mongoose_1.default.Types.ObjectId(userId) })
            .populate('orderItems.product')
            .exec();
        return orders;
    }
    catch (error) {
        throw new Error(`Failed to fetch user orders: ${error.message}`);
    }
});
exports.getOrdersByUser = getOrdersByUser;
const updateOrderStatus = (orderId, status) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedOrder = yield order_model_1.default.findByIdAndUpdate(orderId, { status }, { new: true })
        .populate('user', '-password')
        .populate('orderItems.product')
        .exec();
    return updatedOrder;
});
exports.updateOrderStatus = updateOrderStatus;
const updateOrder = (orderId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedOrder = yield order_model_1.default.findByIdAndUpdate(orderId, updateData, { new: true }).populate('user', '-password');
        return updatedOrder;
    }
    catch (error) {
        throw error;
    }
});
exports.updateOrder = updateOrder;
const deleteOrder = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedOrder = yield order_model_1.default.findByIdAndDelete(orderId).exec();
    return deletedOrder;
});
exports.deleteOrder = deleteOrder;
//# sourceMappingURL=order.services.js.map