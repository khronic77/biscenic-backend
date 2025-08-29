import { Router } from "express";
import * as categoryController from "../controllers/category.controller";
import { protect, admin } from "../middleware/auth.middleware";

const router = Router();

router.post(
  "/",
  protect,
  admin,
  categoryController.createCategoryController  
);
router.get("/", categoryController.getAllCategoriesController);  
router.get("/:id", categoryController.getCategoryByIdController);  
router.put(
  "/:id",
  protect,
  admin,
  categoryController.updateCategoryController  
);
router.delete(
  "/:id",
  protect,
  admin,
  categoryController.deleteCategoryController  
);

export default router;
