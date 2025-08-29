"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const payment_controller_1 = require("../controllers/payment.controller");
const router = express_1.default.Router();
router.post('/initialize', payment_controller_1.initiatePayment);
router.get('/verify', payment_controller_1.verifyPayment);
exports.default = router;
//# sourceMappingURL=payment.routes.js.map