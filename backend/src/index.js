import dotenv from "dotenv";
import connectDB from "./connectDB/connectDB.js";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

// Database Connection & Server Start
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port http://localhost:${PORT}`);
        });
    }).catch((error) => {
        console.log("MongoDB connection failed", error);
    });