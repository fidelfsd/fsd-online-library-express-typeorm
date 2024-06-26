import express from "express";
import { loanController } from "../controllers/loanController";
import { auth } from "../middlewares/auth";
import { authorize } from "../middlewares/authorize";

const router = express.Router();

const ctrl = loanController;

// Protected routes
router.get("/", auth, authorize(["admin", "manager"]), ctrl.getAll);
router.get("/:id", auth, authorize(["admin", "manager"]), ctrl.getById);
router.post("/", auth, authorize(["admin", "manager"]), ctrl.create);
router.put("/:id", auth, authorize(["admin", "manager"]), ctrl.update);
router.delete("/:id", auth, authorize(["admin", "manager"]), ctrl.delete);

export default router;
