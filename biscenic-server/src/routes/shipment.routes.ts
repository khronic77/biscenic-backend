// src/routes/shipment.routes.ts
import express from 'express';
import { ShipmentController } from '../controllers/shipment.controller';

const router = express.Router();

router.post('/', ShipmentController.createShipment);
router.get('/:id', ShipmentController.getShipmentById);
router.get('/', ShipmentController.getAllShipments);
router.put('/:id', ShipmentController.updateShipment);
router.delete('/:id', ShipmentController.deleteShipment);

export default router;
