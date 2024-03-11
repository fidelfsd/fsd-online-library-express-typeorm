import express from "express";
import userRoutes from "./users.routes";
import authorRoutes from "./authors.routes";
import authRoutes from "./auth.routes";

const router = express.Router();

// API routes
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/authors", authorRoutes);

export default router;
