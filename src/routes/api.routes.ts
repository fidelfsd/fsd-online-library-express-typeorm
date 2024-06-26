import express from "express";
import userRoutes from "./users.routes";
import authorRoutes from "./authors.routes";
import authRoutes from "./auth.routes";
import bookRoutes from "./books.routes";

const router = express.Router();

// API routes
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/authors", authorRoutes);
router.use("/books", bookRoutes);

export default router;
