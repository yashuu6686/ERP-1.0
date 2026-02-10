import express from "express";
import {
    Login,
    Register,
    Logout,
    GetMe,
    GetAllUsers,
    GetUserById,
    UpdateUser,
    DeleteUser
} from "../controller/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", Login);
router.post("/logout", Logout);
router.get("/me", protect, GetMe);

// Admin/protected user management routes
router.get("/", protect, GetAllUsers);
router.post("/", protect, Register); // Same as /register but usually for admins
router.get("/:id", protect, GetUserById);
router.put("/:id", protect, UpdateUser);
router.delete("/:id", protect, DeleteUser);

export default router;