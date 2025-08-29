import { Router } from 'express';
import * as orderController from '../controllers/order.controller';
import { protect, admin } from '../middleware/auth.middleware';

const router = Router();

router.get('/', protect, admin, orderController.getAllOrders);
router.put('/status', protect, admin, orderController.updateOrderStatus);

router.post('/', protect, orderController.createOrder);
router.get('/user/:userId', protect, orderController.getUserOrders);
router.get('/:orderId', protect, orderController.getOrderById);
router.patch('/:orderId', protect, orderController.updateOrder); // ADD THIS LINE
router.delete('/:orderId', protect, admin, orderController.deleteOrder);

export default router;
