"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/shipment.routes.ts
const express_1 = __importDefault(require("express"));
const shipment_controller_1 = require("../controllers/shipment.controller");
const router = express_1.default.Router();
router.post('/', shipment_controller_1.ShipmentController.createShipment);
router.get('/:id', shipment_controller_1.ShipmentController.getShipmentById);
router.get('/', shipment_controller_1.ShipmentController.getAllShipments);
router.put('/:id', shipment_controller_1.ShipmentController.updateShipment);
router.delete('/:id', shipment_controller_1.ShipmentController.deleteShipment);
exports.default = router;
//# sourceMappingURL=shipment.routes.js.map