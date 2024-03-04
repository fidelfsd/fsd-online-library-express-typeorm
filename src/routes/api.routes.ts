import express from "express";
import userRoutes from "./users.routes";

const router = express.Router();

// API routes
router.use("/users", userRoutes);

export default router;
