import Category from "../models/category.model";
import { ICategory, ICategoryDoc } from "../interfaces/category.interface";

export const createCategory = async (
  categoryData: ICategory
): Promise<ICategoryDoc> => {
  try {
    const existingCategory = await Category.findOne({
      name: { $regex: new RegExp(`^${categoryData.name}$`, "i") },
    });

    if (existingCategory) {
      throw new Error("Category with this name already exists");
    }

    const category = new Category(categoryData);
    return await category.save();
  } catch (err: any) {
    console.error("Category creation error:", err);
    throw new Error(err.message || "Error creating category");
  }
};
export const getAllCategories = async (): Promise<ICategoryDoc[]> => {
  try {
    return await Category.find();
  } catch (err) {
    throw new Error("Error fetching categories");
  }
};
export const getCategoryById = async (
  id: string
): Promise<ICategoryDoc | null> => {
  try {
    return await Category.findById(id);
  } catch (err) {
    throw new Error("Error finding category");
  }
};
export const updateCategory = async (
  id: string,
  updateData: Partial<ICategoryDoc>
): Promise<ICategoryDoc | null> => {
  try {
    return await Category.findByIdAndUpdate(id, updateData, { new: true });
  } catch (err) {
    throw new Error("Error updating category");
  }
};
export const deleteCategory = async (
  id: string
): Promise<ICategoryDoc | null> => {
  try {
    return await Category.findByIdAndDelete(id);
  } catch (err) {
    throw new Error("Error deleting category");
  }
};
