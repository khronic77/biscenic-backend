// /controllers/product.controller.ts
import { Request, Response, NextFunction } from "express";
import Product from "../models/product.model";
import * as ProductService from "../services/product.services";

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    console.log("=== DEBUG REQUEST START ===");
    console.log("Headers:", req.headers);
    console.log("Body:", req.body);
    console.log("Files:", req.files);
    console.log("=== DEBUG REQUEST END ===");

    const uploadedFiles = req.files as
      | { [fieldname: string]: Express.Multer.File[] }
      | Express.Multer.File[];
    const files = Array.isArray(uploadedFiles)
      ? uploadedFiles
      : uploadedFiles?.images || [];

    const rawData = req.body;
    const productData = {
      name: rawData.name?.toString().trim(),
      description: rawData.description?.toString().trim(),
      price: parseFloat(rawData.price),
      stock: parseInt(rawData.stock),
      category: rawData.category?.toString().trim(),
    };

    console.log("Parsed product data:", productData);

    const validationErrors: Record<string, string> = {};

    if (!productData.name) validationErrors.name = "Name is required";
    if (!productData.description)
      validationErrors.description = "Description is required";
    if (!productData.price || isNaN(productData.price))
      validationErrors.price = "Valid price is required";
    if (!productData.stock || isNaN(productData.stock))
      validationErrors.stock = "Valid stock quantity is required";
    if (!productData.category)
      validationErrors.category = "Category is required";

    if (Object.keys(validationErrors).length > 0) {
      res.status(400).json({
        message: "All product fields are required and must be valid",
        error: true,
        missing: validationErrors,
      });
      return;
    }

    if (!files || files.length === 0) {
      res.status(400).json({
        message: "At least one product image is required",
        error: true,
      });
      return;
    }

    // Validate category exists
    const mongoose = require("mongoose");
    if (!mongoose.Types.ObjectId.isValid(productData.category)) {
      res.status(400).json({
        message: "Invalid category ID format",
        error: true,
      });
      return;
    }

    const newProduct = await ProductService.createProductService(
      productData,
      files
    );

    res.status(201).json({
      message: "Product created successfully",
      error: false,
      data: {
        ...newProduct.toObject(),
        images: newProduct.images.map((img) => ({
          url: img.url,
          isMain: img.isMain,
        })),
      },
    });
    return;
  } catch (error: any) {
    console.error("Product creation error:", error);
    console.error("Error stack:", error.stack);
    res.status(500).json({
      message: "Failed to create product",
      error: true,
      details: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
    return;
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const files = req.files as Express.Multer.File[] | undefined;
    const { name, description, price, stock, category, existingImageIds } =
      req.body;

    let updatedProduct;

    if (files && files.length > 0) {
      updatedProduct = await ProductService.updateProductImages(
        id,
        files,
        existingImageIds
      );
    }

    updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        ...(name && { name }),
        ...(description && { description }),
        ...(price && { price }),
        ...(stock && { stock }),
        ...(category && { category }),
      },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      res.status(404).json({
        message: "Product not found",
        error: true,
      });
      return;
    }

    res.status(200).json({
      message: "Product updated successfully",
      error: false,
      data: updatedProduct,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Failed to update product",
      error: true,
      details: error.message,
    });
  }
};

export const updateProductImages = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { existingImageIds } = req.body;
    const files = req.files as Express.Multer.File[];

    const updatedProduct = await ProductService.updateProductImages(
      id,
      files,
      existingImageIds
    );
    if (!updatedProduct) {
      res.status(404).json({
        message: "Product not found",
        error: true,
      });
      return;
    }

    res.status(200).json({
      message: "Product images updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const products = await Product.find().populate("category");
    res.status(200).json({
      message: "Products fetched successfully",
      data: products.map((product) => ({
        ...product.toObject(),
        images: product.images.map((img) => ({
          url: img.url,
          publicId: img.publicId,
          isMain: img.isMain,
        })),
      })),
      error: false,
    });
  } catch (error) {
    next(error);
  }
};
export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).populate("category");
    if (!product) {
      res
        .status(404)
        .json({ message: "Product not found", data: null, error: true });
      return;
    }
    res.status(200).json({
      message: "Product fetched successfully",
      data: product,
      error: false,
    });
  } catch (error) {
    next(error);
  }
};
export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      res.status(404).json({ message: "Product not found", error: true });
      return;
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
};
