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
exports.ShipmentService = void 0;
const shipment_model_1 = __importDefault(require("../models/shipment.model"));
const address_model_1 = __importDefault(require("../models/address.model"));
const mongoose_1 = __importDefault(require("mongoose"));
class ShipmentService {
    /**
     * Create a new shipment.
     * @param data - Partial shipment data.
     * @returns The created shipment document.
     */
    static createShipment(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (data.shippingAddress) {
                const addressExists = yield address_model_1.default.findById(data.shippingAddress);
                if (!addressExists)
                    throw new Error('Invalid or non-existent shipping address.');
            }
            const shipment = new shipment_model_1.default(data);
            return shipment.save();
        });
    }
    /**
     * Get a shipment by its ID.
     * @param id - Shipment ID.
     * @returns The shipment document or null.
     */
    static getShipmentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!mongoose_1.default.Types.ObjectId.isValid(id))
                throw new Error('Invalid shipment ID.');
            const shipment = yield shipment_model_1.default.findById(id).populate('order user shippingAddress').exec();
            return shipment;
        });
    }
    /**
     * Get all shipments.
     * @returns An array of shipment documents.
     */
    static getAllShipments() {
        return __awaiter(this, void 0, void 0, function* () {
            const shipments = yield shipment_model_1.default.find().populate('order user shippingAddress').exec();
            return shipments;
        });
    }
    /**
     * Update a shipment by its ID.
     * @param id - Shipment ID.
     * @param data - Data to update the shipment with.
     * @returns The updated shipment document or null.
     */
    static updateShipment(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!mongoose_1.default.Types.ObjectId.isValid(id))
                throw new Error('Invalid shipment ID.');
            if (data.shippingAddress) {
                const addressExists = yield address_model_1.default.findById(data.shippingAddress);
                if (!addressExists)
                    throw new Error('Invalid or non-existent shipping address.');
            }
            const updatedShipment = yield shipment_model_1.default.findByIdAndUpdate(id, data, { new: true }).exec();
            return updatedShipment;
        });
    }
    /**
     * Delete a shipment by its ID.
     * @param id - Shipment ID.
     * @returns The deleted shipment document or null.
     */
    static deleteShipment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!mongoose_1.default.Types.ObjectId.isValid(id))
                throw new Error('Invalid shipment ID.');
            const deletedShipment = yield shipment_model_1.default.findByIdAndDelete(id).exec();
            return deletedShipment;
        });
    }
}
exports.ShipmentService = ShipmentService;
//# sourceMappingURL=shipment.services.js.map