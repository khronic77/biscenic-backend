import express from "express";
import {
  addAddress,
  getAllAddresses,
  updateAddress,
  deleteAddress,
} from "../controllers/address.controller";
import { protect } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/", protect, addAddress);
router.get("/", protect, getAllAddresses);
router.put("/:id", protect, updateAddress);
router.delete("/:id", protect, deleteAddress);

export default router;
