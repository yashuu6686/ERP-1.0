import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./connectDB/connectDB.js";
import userRoutes from "./routes/userRoutes.js";
import roleRoutes from "./routes/settings/roleRoutes.js";
import supplierRoutes from "./routes/supplierRoutes.js";
import supplierSurveyRoutes from "./routes/supplierSurveyRoutes.js";
import purchaseOrderRoutes from "./routes/purachase/purchaseOrderRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/supplier-surveys", supplierSurveyRoutes);
app.use("/api/purchase-orders", purchaseOrderRoutes);

// Health Check
app.get("/", (req, res) => {
    res.send("ERP Backend is running...");
});

// Database Connection & Server Start
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port http://localhost:${PORT}`);
        });
    }).catch((error) => {
        console.log("MongoDB connection failed", error);
    });