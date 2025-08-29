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
exports.ShipmentController = void 0;
const shipment_services_1 = require("../services/shipment.services");
const mongoose_1 = __importDefault(require("mongoose"));
class ShipmentController {
    static createShipment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const shipmentData = req.body;
                const shipment = yield shipment_services_1.ShipmentService.createShipment(shipmentData);
                res.status(201).json({
                    error: false,
                    message: 'Shipment created successfully.',
                    data: shipment,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getShipmentById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id || !mongoose_1.default.Types.ObjectId.isValid(id)) {
                    res.status(400).json({ error: true, message: 'Invalid shipment ID.', data: null });
                    return;
                }
                const shipment = yield shipment_services_1.ShipmentService.getShipmentById(id);
                if (!shipment) {
                    res.status(404).json({ error: true, message: 'Shipment not found.', data: null });
                    return;
                }
                res.status(200).json({
                    error: false,
                    message: 'Shipment retrieved successfully.',
                    data: shipment,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getAllShipments(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const shipments = yield shipment_services_1.ShipmentService.getAllShipments();
                res.status(200).json({
                    error: false,
                    message: 'Shipments retrieved successfully.',
                    data: shipments,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static updateShipment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const updateData = req.body;
                if (!id || !mongoose_1.default.Types.ObjectId.isValid(id)) {
                    res.status(400).json({ error: true, message: 'Invalid shipment ID.', data: null });
                    return;
                }
                const updatedShipment = yield shipment_services_1.ShipmentService.updateShipment(id, updateData);
                if (!updatedShipment) {
                    res.status(404).json({ error: true, message: 'Shipment not found.', data: null });
                    return;
                }
                res.status(200).json({
                    error: false,
                    message: 'Shipment updated successfully.',
                    data: updatedShipment,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static deleteShipment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id || !mongoose_1.default.Types.ObjectId.isValid(id)) {
                    res.status(400).json({ error: true, message: 'Invalid shipment ID.', data: null });
                    return;
                }
                const deletedShipment = yield shipment_services_1.ShipmentService.deleteShipment(id);
                if (!deletedShipment) {
                    res.status(404).json({ error: true, message: 'Shipment not found.', data: null });
                    return;
                }
                res.status(200).json({
                    error: false,
                    message: 'Shipment deleted successfully.',
                    data: null,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.ShipmentController = ShipmentController;
//# sourceMappingURL=shipment.controller.js.map