import { Request, Response, NextFunction } from 'express';
import { ShipmentService } from '../services/shipment.services';
import mongoose from 'mongoose';

export class ShipmentController {
    static async createShipment(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const shipmentData = req.body;

            const shipment = await ShipmentService.createShipment(shipmentData);

            res.status(201).json({
                error: false,
                message: 'Shipment created successfully.',
                data: shipment,
            });
        } catch (error) {
            next(error);
        }
    }

    static async getShipmentById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;

            if (!id || !mongoose.Types.ObjectId.isValid(id)) {
                res.status(400).json({ error: true, message: 'Invalid shipment ID.', data: null });
                return;
            }

            const shipment = await ShipmentService.getShipmentById(id);

            if (!shipment) {
                res.status(404).json({ error: true, message: 'Shipment not found.', data: null });
                return;
            }

            res.status(200).json({
                error: false,
                message: 'Shipment retrieved successfully.',
                data: shipment,
            });
        } catch (error) {
            next(error);
        }
    }

    static async getAllShipments(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const shipments = await ShipmentService.getAllShipments();
            res.status(200).json({
                error: false,
                message: 'Shipments retrieved successfully.',
                data: shipments,
            });
        } catch (error) {
            next(error);
        }
    }

    static async updateShipment(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const updateData = req.body;

            if (!id || !mongoose.Types.ObjectId.isValid(id)) {
                res.status(400).json({ error: true, message: 'Invalid shipment ID.', data: null });
                return;
            }

            const updatedShipment = await ShipmentService.updateShipment(id, updateData);

            if (!updatedShipment) {
                res.status(404).json({ error: true, message: 'Shipment not found.', data: null });
                return;
            }

            res.status(200).json({
                error: false,
                message: 'Shipment updated successfully.',
                data: updatedShipment,
            });
        } catch (error) {
            next(error);
        }
    }

    static async deleteShipment(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;

            if (!id || !mongoose.Types.ObjectId.isValid(id)) {
                res.status(400).json({ error: true, message: 'Invalid shipment ID.', data: null });
                return;
            }

            const deletedShipment = await ShipmentService.deleteShipment(id);

            if (!deletedShipment) {
                res.status(404).json({ error: true, message: 'Shipment not found.', data: null });
                return;
            }

            res.status(200).json({
                error: false,
                message: 'Shipment deleted successfully.',
                data: null,
            });
        } catch (error) {
            next(error);
        }
    }
}