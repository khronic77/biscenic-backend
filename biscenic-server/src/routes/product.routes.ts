import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  updateProductImages,
} from "../controllers/product.controller";
import {
  multerErrorHandler,
  uploadMiddleware,
} from "../middleware/upload.middleware";
import { protect, admin } from "../middleware/auth.middleware";
import { authorizeRoles } from "../middleware/role.middleware";
import { UserRole } from "../interfaces/user.interfaces";

const router = Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);

router.post(
  "/",
  protect,
  admin,
  uploadMiddleware,
  multerErrorHandler,
  createProduct
);

router.put(
  "/:id",
  protect,
  admin,
  uploadMiddleware,
  multerErrorHandler,
  updateProduct
);

router.patch(
  "/:id/images",
  protect,
  admin,
  uploadMiddleware,
  multerErrorHandler,
  updateProductImages
);

router.delete(
  "/:id",
  protect,
  admin,
  deleteProduct
);

export default router;
