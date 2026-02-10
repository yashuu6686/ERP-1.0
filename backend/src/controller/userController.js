import User from "../model/userModel.js";
import Role from "../model/roleModel.js";
import jwt from "jsonwebtoken";

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: "1d",
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
        res.status(201).json({ message: "User created successfully", user: { id: user._id, name: user.name, email: user.email, role: user.role } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating user" });
    }
};

const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Please provide email and password" });
        }

        const user = await User.findOne({ email });
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

        const token = generateToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000,
        });

        // Fetch role permissions
        const roleData = await Role.findOne({ name: user.role });
        const rolePermissions = roleData ? roleData.permissions : {};

        // Merge permissions
        const mergedPermissions = mergePermissions(rolePermissions, user.additionalPermissions);

        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                permissions: mergedPermissions
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong try again later" });
    }
};

const Logout = (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
};

const GetAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select("-password");
        // Map _id to id for frontend compatibility
        const mappedUsers = users.map(user => ({
            ...user._doc,
            id: user._id
        }));
        res.status(200).json(mappedUsers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching users" });
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

export {
    Login,
    Register,
    Logout,
    GetMe,
    GetAllUsers,
    GetUserById,
    UpdateUser,
    DeleteUser
};