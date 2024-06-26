import express from "express";
import { bookController } from "../controllers/bookController";
import { auth } from "../middlewares/auth";
import { authorize } from "../middlewares/authorize";

const router = express.Router();

const ctrl = bookController;

//  Public routes
router.get("/", ctrl.getAll);
router.get("/:id", ctrl.getById);

// Protected routes
router.post("/", auth, authorize(["admin"]), ctrl.create);

router.put("/:id", auth, authorize(["admin"]), ctrl.update);

router.delete("/:id", auth, authorize(["admin"]), ctrl.delete);

export default router;
