import express from "express";
import {
    createSupplier,
    getSuppliers,
    getSupplierById,
    updateSupplier,
    deleteSupplier
} from "../controller/supplierController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getSuppliers);
router.post("/", protect, createSupplier);
router.get("/:id", protect, getSupplierById);
router.put("/:id", protect, updateSupplier);
router.delete("/:id", protect, deleteSupplier);

export default router;
