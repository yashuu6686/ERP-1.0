import express from "express";
import {
    createSupplierSurvey,
    getSupplierSurveys,
    getSupplierSurveyById,
    updateSupplierSurvey,
    deleteSupplierSurvey
} from "../controller/supplierSurveyController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getSupplierSurveys);
router.post("/", protect, createSupplierSurvey);
router.get("/:id", protect, getSupplierSurveyById);
router.put("/:id", protect, updateSupplierSurvey);
router.delete("/:id", protect, deleteSupplierSurvey);

export default router;
