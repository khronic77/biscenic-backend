//src/controllers/address.controller.ts
import { Request, Response } from "express";
import * as AddressService from "../services/address.services";

export const addAddress = async (req: Request, res: Response): Promise<void> => {
  const { street, city, state, country, zipCode, phoneNumber, isDefault } = req.body;

  if (!req.user) {
    res.status(401).json({ message: "Unauthorized", error: true });
    return;
  }
  
  const userId = req.user._id.toString();

  try {
    const newAddress = await AddressService.addAddress({
      user: userId,
      street,
      city,
      state,
      country,
      zipCode,
      phoneNumber,
      isDefault,
    });

    res.status(201).json({
      message: "Address added successfully",
      data: newAddress,
      error: null,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Error adding address",
      error: error.message,
    });
  }
};

export const getAllAddresses = async (req: Request, res: Response): Promise<void> => {
    if (!req.user) {
      res.status(401).json({
        message: "Unauthorized",
        error: "User is not authenticated",
        data: null,
      });
      return;
    }
  
    const userId = req.user._id.toString();
  
    try {
      const addresses = await AddressService.getAllAddresses(userId);
  
      res.status(200).json({
        message: "Addresses retrieved successfully",
        data: addresses,
        error: null,
      });
    } catch (error: any) {
      res.status(500).json({
        message: "Error retrieving addresses",
        error: error.message,
      });
    }
  };
  

  export const updateAddress = async (req: Request, res: Response):Promise<void> => {
    if (!req.user) {
      res.status(401).json({
        message: "Unauthorized",
        error: "User is not authenticated",
        data: null,
      });
      return
    }
  
    const { id } = req.params;
    const updates = req.body;
    const userId = req.user._id.toString();
  
    try {
      const updatedAddress = await AddressService.updateAddress(id, userId, updates);
  
      res.status(200).json({
        message: "Address updated successfully",
        data: updatedAddress,
        error: null,
      });
    } catch (error: any) {
      res.status(500).json({
        message: "Error updating address",
        error: error.message,
      });
    }
  };
  
  

  export const deleteAddress = async (req: Request, res: Response): Promise<void> => {
    if (!req.user) {
      res.status(401).json({
        message: "Unauthorized",
        error: "User is not authenticated",
        data: null,
      });
      return
    }
  
    const { id } = req.params;
    const userId = req.user._id.toString();
  
    try {
      await AddressService.deleteAddress(id, userId);
  
      res.status(200).json({
        message: "Address deleted successfully",
        data: null,
        error: null,
      });
    } catch (error: any) {
      res.status(500).json({
        message: "Error deleting address",
        error: error.message,
      });
    }
  };
  