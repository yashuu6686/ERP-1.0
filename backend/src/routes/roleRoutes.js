import express from "express";
import {
    CreateRole,
    GetRoles,
    GetRoleById,
    UpdateRole,
    DeleteRole
} from "../controller/roleController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", GetRoles); // Public/Protected depending on needs, but usually authenticated
router.post("/", protect, CreateRole);
router.get("/:id", protect, GetRoleById);
router.put("/:id", protect, UpdateRole);
router.delete("/:id", protect, DeleteRole);

export default router;
