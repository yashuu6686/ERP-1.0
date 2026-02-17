import express from "express";
import {
    CreatePurchaseOrder,
    GetPurchaseOrders,
    GetPurchaseOrderById,
    UpdatePurchaseOrder,
    DeletePurchaseOrder
} from "../../controller/purachase/purchaseOrderController.js";
import { protect } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", GetPurchaseOrders);
router.post("/", protect, CreatePurchaseOrder);
router.get("/:id", protect, GetPurchaseOrderById);
router.put("/:id", protect, UpdatePurchaseOrder);
router.delete("/:id", protect, DeletePurchaseOrder);

export default router;
