import Product from "../models/product.model";
import { IProductDoc } from "../interfaces/product.interfaces";
import { uploadImage, deleteImage } from "../services/upload.service";

export const findProductById = async (
  id: string
): Promise<IProductDoc | null> => {
  try {
    return await Product.findById(id);
  } catch (err) {
    throw new Error("Error finding product");
  }
};

export const createProductService = async (
  productData: any,
  files: Express.Multer.File[]
): Promise<IProductDoc> => {
  try {
    const uploadPromises = files.map((file) => uploadImage(file));
    const uploadedImages = await Promise.all(uploadPromises);

    const images = uploadedImages.map((img, index) => ({
      ...img,
      isMain: index === 0,
    }));

    const product = new Product({
      ...productData,
      images,
    });

    return await product.save();
  } catch (err: any) {
    if (err && productData.images) {
      await Promise.all(
        productData.images.map((img: { publicId: string }) =>
          deleteImage(img.publicId)
        )
      );
    }
    throw new Error(`Error creating product: ${err.message}`);
  }
};

export const updateProductImages = async (
  productId: string,
  files: Express.Multer.File[],
  existingImageIds?: string[]
): Promise<IProductDoc | null> => {
  try {
    const product = await Product.findById(productId);
    if (!product) return null;

    if (existingImageIds && existingImageIds.length > 0) {
      const imagesToDelete = product.images.filter((img) =>
        existingImageIds.includes(img.publicId)
      );
      await Promise.all(imagesToDelete.map((img) => deleteImage(img.publicId)));
      product.images = product.images.filter(
        (img) => !existingImageIds.includes(img.publicId)
      );
    }

    if (files && files.length > 0) {
      const uploadPromises = files.map((file) => uploadImage(file));
      const uploadedImages = await Promise.all(uploadPromises);
      const newImages = uploadedImages.map((img) => ({
        ...img,
        isMain: product.images.length === 0,
      }));
      product.images = [...product.images, ...newImages];
    }

    return await product.save();
  } catch (err) {
    throw new Error("Error updating product images");
  }
};
