import Shipment from '../models/shipment.model';
import Address from '../models/address.model';
import IShipmentDoc from '../interfaces/shipment.interface';
import mongoose from 'mongoose';

export class ShipmentService {
    /**
     * Create a new shipment.
     * @param data - Partial shipment data.
     * @returns The created shipment document.
     */
    static async createShipment(data: Partial<IShipmentDoc>): Promise<IShipmentDoc> {
        if (data.shippingAddress) {
            const addressExists = await Address.findById(data.shippingAddress);
            if (!addressExists) throw new Error('Invalid or non-existent shipping address.');
        }

        const shipment = new Shipment(data) as IShipmentDoc;
        return shipment.save() as unknown as IShipmentDoc;
    }

    /**
     * Get a shipment by its ID.
     * @param id - Shipment ID.
     * @returns The shipment document or null.
     */
    static async getShipmentById(id: string): Promise<IShipmentDoc | null> {
        if (!mongoose.Types.ObjectId.isValid(id)) throw new Error('Invalid shipment ID.');

        const shipment = await Shipment.findById(id).populate('order user shippingAddress').exec();
        return shipment as IShipmentDoc | null;
    }

    /**
     * Get all shipments.
     * @returns An array of shipment documents.
     */
    static async getAllShipments(): Promise<IShipmentDoc[]> {
        const shipments = await Shipment.find().populate('order user shippingAddress').exec();
        return shipments as IShipmentDoc[];
    }


    /**
     * Update a shipment by its ID.
     * @param id - Shipment ID.
     * @param data - Data to update the shipment with.
     * @returns The updated shipment document or null.
     */
    static async updateShipment(id: string, data: Partial<IShipmentDoc>): Promise<IShipmentDoc | null> {
        if (!mongoose.Types.ObjectId.isValid(id)) throw new Error('Invalid shipment ID.');
    
        if (data.shippingAddress) {
            const addressExists = await Address.findById(data.shippingAddress);
            if (!addressExists) throw new Error('Invalid or non-existent shipping address.');
        }
    
        const updatedShipment = await Shipment.findByIdAndUpdate(id, data, { new: true }).exec();
        return updatedShipment as IShipmentDoc | null;
    }
    

    /**
     * Delete a shipment by its ID.
     * @param id - Shipment ID.
     * @returns The deleted shipment document or null.
     */
    static async deleteShipment(id: string): Promise<IShipmentDoc | null> {
        if (!mongoose.Types.ObjectId.isValid(id)) throw new Error('Invalid shipment ID.');
    
        const deletedShipment = await Shipment.findByIdAndDelete(id).exec();
        return deletedShipment as IShipmentDoc | null;
    }
}