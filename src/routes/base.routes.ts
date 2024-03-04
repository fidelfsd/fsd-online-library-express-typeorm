import express, { Request, Response } from "express";

const router = express.Router();

// Base route
router.get("/", (req: Request, res: Response) => {
   res.send("Welcome to REST API for Book Loan Management in a library");
});

export default router;
