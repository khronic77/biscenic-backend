import express from 'express';
import * as orderItemController from '../controllers/orderItem.controller';

const router = express.Router();

router.post('/', orderItemController.createOrderItem);
router.get('/:orderId', orderItemController.getOrderItems);
router.delete('/:id', orderItemController.deleteOrderItem);

export default router;
