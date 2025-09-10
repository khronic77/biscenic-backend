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
exports.verifyPayment = exports.initiatePayment = void 0;
const axios_1 = __importDefault(require("axios"));
const initiatePayment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { email, amount } = req.body;
    if (!email || !amount) {
        res.status(400).json({ message: "Email and amount are required", data: null, error: true });
        return;
    }
    try {
        const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY;
        const response = yield axios_1.default.post('https://api.paystack.co/transaction/initialize', {
            email,
            amount,
        }, {
            headers: {
                Authorization: `Bearer ${paystackSecretKey}`,
            }
        });
        console.log(response);
        const { authorization_url } = response.data.data;
        res.status(200).json({
            message: "Payment initialization successful",
            data: { authorization_url },
            error: null
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to initialize payment",
            data: null,
            error: ((_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || error.message
        });
    }
});
exports.initiatePayment = initiatePayment;
const verifyPayment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { reference } = req.query;
    if (!reference) {
        res.status(400).json({
            message: "Transaction reference is required",
            data: null,
            error: true
        });
        return;
    }
    try {
        const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY;
        const response = yield axios_1.default.get(`https://api.paystack.co/transaction/verify/${reference}`, {
            headers: {
                Authorization: `Bearer ${paystackSecretKey}`
            }
        });
        const paymentData = response.data.data;
        if (paymentData.status === 'success') {
            res.status(200).json({
                message: "Payment verification successful",
                data: paymentData,
                error: null
            });
        }
        else {
            res.status(400).json({
                message: "Payment verification failed",
                data: paymentData,
                error: true
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to verify payment",
            data: null,
            error: ((_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || error.message
        });
    }
});
exports.verifyPayment = verifyPayment;
//# sourceMappingURL=payment.controller.js.map