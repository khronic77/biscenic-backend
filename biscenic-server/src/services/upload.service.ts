import { v2 as cloudinary } from "cloudinary";
import { CloudinaryResponse } from "../interfaces/cloudinary.interface";
import fs from 'fs/promises';

// Validate environment variables
const requiredEnvVars = [
  'CLOUDINARY_CLOUD_NAME',
  'CLOUDINARY_API_KEY',
  'CLOUDINARY_API_SECRET'
];

requiredEnvVars.forEach(envVar => {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const ALLOWED_FORMATS = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// Add this interface to type the eager transformation result
interface CloudinaryEagerResult {
  secure_url: string;
  url: string;
  format: string;
  width: number;
  height: number;
}

export const uploadImage = async (
  file: Express.Multer.File
): Promise<CloudinaryResponse> => {
  try {
    // Validate file
    if (!file) {
      throw new Error('No file provided');
    }

    if (!ALLOWED_FORMATS.includes(file.mimetype)) {
      throw new Error('Invalid file format. Only JPEG, PNG, and WebP are allowed');
    }

    if (file.size > MAX_FILE_SIZE) {
      throw new Error('File size exceeds 5MB limit');
    }

    const result = await cloudinary.uploader.upload(file.path, {
      folder: "biscenic/products",
      use_filename: true,
      unique_filename: true,
      resource_type: "auto",
      transformation: [
        { width: 1000, height: 1000, crop: "limit" },
        { quality: "auto:best" },
        { fetch_format: "auto" },
        { strip: true }, // Remove metadata
        { dpr: "auto" }, // Automatic device pixel ratio
      ],
      eager: [
        // Generate thumbnails
        { width: 200, height: 200, crop: "fill", format: "webp" },
        { width: 400, height: 400, crop: "fill", format: "webp" },
      ],
      eager_async: true,
    });

    // Clean up the temporary file
    await fs.unlink(file.path).catch(err => 
      console.error(`Failed to delete temporary file ${file.path}:`, err)
    );

    return {
      url: result.secure_url,
      publicId: result.public_id,
      thumbnails: result.eager?.map((img: CloudinaryEagerResult) => img.secure_url) || [],
    };
  } catch (error: any) {
    // Try to clean up the temporary file even if upload failed
    await fs.unlink(file.path).catch(err => 
      console.error(`Failed to delete temporary file ${file.path}:`, err)
    );
    throw new Error(`Failed to upload image: ${error.message}`);
  }
};

export const deleteImage = async (publicId: string): Promise<void> => {
  try {
    if (!publicId) {
      throw new Error('No publicId provided');
    }

    const result = await cloudinary.uploader.destroy(publicId);
    
    if (result.result !== 'ok') {
      throw new Error(`Failed to delete image: ${result.result}`);
    }
  } catch (error: any) {
    throw new Error(`Failed to delete image: ${error.message}`);
  }
};

export const updateImage = async (
  publicId: string,
  file: Express.Multer.File
): Promise<CloudinaryResponse> => {
  try {
    if (!publicId) {
      throw new Error('No publicId provided');
    }

    const deleteResult = await cloudinary.uploader.destroy(publicId);
    
    if (deleteResult.result !== 'ok') {
      throw new Error('Failed to delete existing image');
    }

    return await uploadImage(file);
  } catch (error: any) {
    throw new Error(`Failed to update image: ${error.message}`);
  }
};
