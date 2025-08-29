"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cart_controller_1 = require("../controllers/cart.controller");
const router = (0, express_1.Router)();
router.post('/add', cart_controller_1.addToCart);
router.get('/:userId', cart_controller_1.getCart);
router.delete('/remove', cart_controller_1.removeFromCart);
router.delete('/clear/:userId', cart_controller_1.clearCart);
exports.default = router;
//# sourceMappingURL=cart.routes.js.map