import User from "../model/userModel.js";
import Role from "../model/settings/roleModel.js";
import jwt from "jsonwebtoken";

const generateAccessToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: "15m", // Short-lived access token
    });
};

const generateRefreshToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET, {
        expiresIn: "7d", // Long-lived refresh token
    });
};

const mergePermissions = (rolePermissions = {}, additionalPermissions = {}) => {
    const merged = { ...rolePermissions };

    Object.keys(additionalPermissions).forEach(moduleKey => {
        if (merged[moduleKey]) {
            merged[moduleKey] = { ...merged[moduleKey], ...additionalPermissions[moduleKey] };
        } else {
            merged[moduleKey] = additionalPermissions[moduleKey];
        }
    });

    return merged;
};

const Register = async (req, res) => {
    try {
        const { name, email, password, role, additionalPermissions, status } = req.body;
        if (!name || !email || !password || !role || !additionalPermissions || !status) {
            return res.status(400).json({ message: "All feilds are required!" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const user = new User({
            name,
            email,
            password,
            role,
            additionalPermissions,
            status
        });

        await user.save();
        return res.status(201).json({ message: "User created successfully", user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error creating user" });
    }
};

const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Please provide email and password" });
        }

        const user = await User.findOne({ email }).populate('role');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.status === "inactive") {
            return res.status(403).json({ message: "Account is inactive" });
        }

        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        // Save refresh token to database
        user.refreshToken = refreshToken;
        await user.save();

        // Set access token cookie (short-lived)
        res.cookie("token", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 15 * 60 * 1000, // 15 minutes
        });

        // Set refresh token cookie (long-lived)
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        // Get role permissions from populated role
        const rolePermissions = user.role?.permissions || {};

        // Merge permissions
        const mergedPermissions = mergePermissions(rolePermissions, user.additionalPermissions);

        return res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role?.name || "Unknown",
                permissions: mergedPermissions
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong try again later" });
    }
};

const Logout = async (req, res) => {
    try {
        // Clear refresh token from database if user is authenticated
        if (req.userId) {
            await User.findByIdAndUpdate(req.userId, { refreshToken: null });
        }

        res.clearCookie("token");
        res.clearCookie("refreshToken");
        return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error logging out" });
    }
};

const GetAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select("-password -refreshToken -id -createdAt -updatedAt -__v").populate("role");
        console.log(users);
        const mappeduser = users.map((user) => {
            return {
                name: user.name,
                email: user.email,
                role: user.role?.name || "Unknown",
                effectiveScope: user.role?.permissions || {},
                status: user.status
            }
        })
        return res
            .status(200)
            .json({
                message: "Users fetched successfully",
                users: mappeduser
            });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error fetching users" });
    }
};

const GetUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ ...user._doc, id: user._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching user" });
    }
};

const UpdateUser = async (req, res) => {
    try {
        const { name, email, role, status, additionalPermissions } = req.body;
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.name = name || user.name;
        user.email = email || user.email;
        user.role = role || user.role;
        user.status = status || user.status;
        user.additionalPermissions = additionalPermissions || user.additionalPermissions;

        if (req.body.password) {
            user.password = req.body.password;
        }

        await user.save();
        res.status(200).json({ message: "User updated successfully", user: { id: user._id, name: user.name, email: user.email, role: user.role } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating user" });
    }
};

const DeleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting user" });
    }
};

const GetMe = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const roleData = await Role.findOne({ name: user.role });
        const rolePermissions = roleData ? roleData.permissions : {};
        const mergedPermissions = mergePermissions(rolePermissions, user.additionalPermissions);

        res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            permissions: mergedPermissions
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching user data" });
    }
};

const RefreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.cookies;

        if (!refreshToken) {
            return res.status(401).json({ message: "Refresh token not found" });
        }

        // Verify refresh token
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET);

        // Find user and check if refresh token matches
        const user = await User.findById(decoded.id);
        if (!user || user.refreshToken !== refreshToken) {
            return res.status(403).json({ message: "Invalid refresh token" });
        }

        // Check if user is active
        if (user.status === "inactive") {
            return res.status(403).json({ message: "Account is inactive" });
        }

        // Generate new access token
        const newAccessToken = generateAccessToken(user._id);

        // Set new access token cookie
        res.cookie("token", newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 15 * 60 * 1000, // 15 minutes
        });

        return res.status(200).json({
            message: "Token refreshed successfully",
            accessToken: newAccessToken
        });
    } catch (error) {
        console.error(error);
        if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
            return res.status(403).json({ message: "Invalid or expired refresh token" });
        }
        return res.status(500).json({ message: "Error refreshing token" });
    }
};

export {
    Login,
    Register,
    Logout,
    RefreshToken,
    GetMe,
    GetAllUsers,
    GetUserById,
    UpdateUser,
    DeleteUser
};