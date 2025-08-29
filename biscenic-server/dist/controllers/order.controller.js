"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllOrders = exports.deleteOrder = exports.updateOrderStatus = exports.updateOrder = exports.getOrderById = exports.getUserOrders = exports.createOrder = void 0;
const orderService = __importStar(require("../services/order.services"));
const createOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const orderData = Object.assign(Object.assign({}, req.body), { user: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id });
        if (!orderData.orderItems || !Array.isArray(orderData.orderItems) || orderData.orderItems.length === 0) {
            res.status(400).json({
                message: 'Order must contain at least one item',
                error: true
            });
            return;
        }
        const newOrder = yield orderService.createOrder(orderData);
        res.status(201).json({
            message: 'Order created successfully',
            data: newOrder,
            error: false
        });
        return;
    }
    catch (error) {
        next(error);
    }
});
exports.createOrder = createOrder;
const getUserOrders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const { userId } = req.params;
        if (userId !== ((_b = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id) === null || _b === void 0 ? void 0 : _b.toString()) && !((_c = req.user) === null || _c === void 0 ? void 0 : _c.roles.includes('admin'))) {
            res.status(403).json({
                message: 'Not authorized to view these orders',
                error: true
            });
            return;
        }
        const orders = yield orderService.getOrdersByUser(userId);
        res.status(200).json({
            message: 'Orders fetched successfully',
            data: orders,
            error: false
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getUserOrders = getUserOrders;
const getOrderById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orderId } = req.params;
        const order = yield orderService.getOrderById(orderId);
        if (!order) {
            res.status(404).json({ message: 'Order not found', data: null, error: true });
            return;
        }
        res.status(200).json({ message: 'Order fetched successfully', data: order, error: null });
    }
    catch (error) {
        next(error);
    }
});
exports.getOrderById = getOrderById;
const updateOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orderId } = req.params;
        const updateData = req.body;
        const updatedOrder = yield orderService.updateOrder(orderId, updateData);
        if (!updatedOrder) {
            res.status(404).json({ message: 'Order not found', data: null, error: true });
            return;
        }
        res.status(200).json({
            message: 'Order updated successfully',
            data: updatedOrder,
            error: null
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateOrder = updateOrder;
const updateOrderStatus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orderId, status } = req.body;
        const updatedOrder = yield orderService.updateOrderStatus(orderId, status);
        res.status(200).json({ message: 'Order status updated successfully', data: updatedOrder, error: null });
    }
    catch (error) {
        next(error);
    }
});
exports.updateOrderStatus = updateOrderStatus;
const deleteOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orderId } = req.params;
        const deletedOrder = yield orderService.deleteOrder(orderId);
        res.status(200).json({ message: 'Order deleted successfully', data: deletedOrder, error: null });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteOrder = deleteOrder;
const getAllOrders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield orderService.getAllOrders();
        res.status(200).json({ message: 'Orders fetched successfully', data: orders, error: null });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllOrders = getAllOrders;
//# sourceMappingURL=order.controller.js.map