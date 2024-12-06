import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/userRoutes.js";
import galleryItemRouter from "./routes/galleryItemRoutes.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";


dotenv.config()

const app = express();

// Middleware for parsing JSON
app.use(express.json());

// Database connection string (replace with environment variable in production)
const connectionString =
    process.env.MONGO_URI ||
    process.env.MONGO_URI;

// Middleware to verify JWT token in request header
app.use((req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", ""); // Fixed the typo here
    if (token != null) {
        jwt.verify(token, "secret", (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Invalid token" });
            }
            req.user = decoded; // Attach decoded user info to the request
            console.log(decoded);
            next(); // Proceed to the next middleware or route handler
        });
    } else {
        next();
    }
});

mongoose
    .connect(connectionString)
    .then(() => {
        console.log("Connected to the database");
    })
    .catch((error) => {
        console.error("Failed to connect to the database:", error); // Log error details
    });

// Mount routers
app.use("/api/users", userRouter); // User-related routes
app.use("/api/gallery", galleryItemRouter); // Gallery-related routes

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
