import { Request, Response } from "express";
import * as categoryService from "../services/category.services";
import { ICategory } from "../interfaces/category.interface";

export const createCategoryController = async (req: Request, res: Response) => {
  try {
    const categoryData: ICategory = {
      name: req.body.name,
      description: req.body.description,
    };

    if (!categoryData.name || !categoryData.description) {
      res.status(400).json({
        message: "Name and description are required",
        data: null,
        error: "Missing required fields",
      });
      return;
    }

    const category = await categoryService.createCategory(categoryData);
    res.status(201).json({
      message: "Category created successfully",
      data: category,
      error: null,
    });
  } catch (err: any) {
    console.error("Category controller error:", err);
    res.status(500).json({
      message: "Error creating category",
      data: null,
      error: err.message || "Internal Server Error",
    });
  }
};

export const getAllCategoriesController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const categories = await categoryService.getAllCategories();
    res.status(200).json({
      message: "All categories fetched successfully",
      data: categories,
      error: null,
    });
  } catch (err: any) {
    res.status(500).json({
      message: "Error fetching all categories",
      data: null,
      error: err.message || "Internal Server Error",
    });
  }
};

export const getCategoryByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const category = await categoryService.getCategoryById(req.params.id);
    if (!category) {
      res.status(404).json({
        message: "Category not found",
        data: null,
        error: "Category not found",
      });
      return;
    }
    res.status(200).json({
      message: "Category fetched successfully",
      data: category,
      error: null,
    });
  } catch (err: any) {
    res.status(500).json({
      message: "Error fetching category by ID",
      data: null,
      error: err.message || "Internal Server Error",
    });
  }
};

export const updateCategoryController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const category = await categoryService.updateCategory(
      req.params.id,
      req.body
    );
    if (!category) {
      res.status(404).json({
        message: "Category not found",
        data: null,
        error: "Category not found",
      });
      return;
    }
    res.status(200).json({
      message: "Category updated successfully",
      data: category,
      error: null,
    });
  } catch (err: any) {
    res.status(500).json({
      message: "Error updating category",
      data: null,
      error: err.message || "Internal Server Error",
    });
  }
};

export const deleteCategoryController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const category = await categoryService.deleteCategory(req.params.id);
    if (!category) {
      res.status(404).json({
        message: "Category not found",
        data: null,
        error: "Category not found",
      });
      return;
    }
    res.status(200).json({
      message: "Category deleted successfully",
      data: null,
      error: null,
    });
  } catch (err: any) {
    res.status(500).json({
      message: "Error deleting category",
      data: null,
      error: err.message || "Internal Server Error",
    });
  }
};
