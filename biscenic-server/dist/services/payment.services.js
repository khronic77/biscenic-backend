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
exports.PaymentService = void 0;
const payment_model_1 = __importDefault(require("../models/payment.model"));
class PaymentService {
    static createPayment(paymentData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user, order, amount, paymentMethod, transactionReference } = paymentData;
            const existingPayment = yield payment_model_1.default.findOne({ transactionReference });
            if (existingPayment) {
                throw new Error('Transaction reference already exists');
            }
            const payment = new payment_model_1.default({
                user,
                order,
                amount,
                paymentMethod,
                transactionReference,
            });
            yield payment.save();
            return payment;
        });
    }
}
exports.PaymentService = PaymentService;
//# sourceMappingURL=payment.services.js.map