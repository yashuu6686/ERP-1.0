import mongoose from "mongoose";
import dotenv from "dotenv";
import Role from "./src/model/roleModel.js";
import User from "./src/model/userModel.js";

dotenv.config();

const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI is not defined in .env");
        }
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("DB Connection Error:", error.message);
        process.exit(1);
    }
};

const seed = async () => {
    try {
        await connectDB();

        // 1. Create Admin Role
        let adminRole = await Role.findOne({ name: "Admin" });
        if (!adminRole) {
            adminRole = new Role({
                name: "Admin",
                permissions: { all: true }
            });
            await adminRole.save();
            console.log("Admin role created");
        }

        // 2. Create User Role
        let userRole = await Role.findOne({ name: "User" });
        if (!userRole) {
            userRole = new Role({
                name: "User",
                permissions: { dashboard: { view: true } }
            });
            await userRole.save();
            console.log("User role created");
        }

        // 3. Create Admin User
        const adminEmail = "admin@erp.com";
        const existingAdmin = await User.findOne({ email: adminEmail });
        if (!existingAdmin) {
            const adminUser = new User({
                name: "Super Admin",
                email: adminEmail,
                password: "adminpassword123",
                role: "Admin",
                status: "active"
            });
            await adminUser.save();
            console.log("Admin user created: admin@erp.com / adminpassword123");
        } else {
            console.log("Admin user already exists");
        }

        console.log("Seeding completed successfully");
        process.exit(0);
    } catch (error) {
        console.error("Seeding failed:", error);
        process.exit(1);
    }
};

seed();
