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
router.post("/logout", protect, Logout);
router.get("/me", protect, GetMe);

// Admin/protected user management routes
router.get("/getallusers", protect, GetAllUsers);
router.post("/registration", Register);
router.get("/:id", protect, GetUserById);
router.put("/:id", protect, UpdateUser);
router.delete("/:id", protect, DeleteUser);

export default router;