import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import roleRoutes from "./routes/roleRoutes.js";
import supplierRoutes from "./routes/supplierRoutes.js";
import supplierSurveyRoutes from "./routes/supplierSurveyRoutes.js";

const app = express();

app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/supplier-surveys", supplierSurveyRoutes);

export default app;