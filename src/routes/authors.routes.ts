import express from "express";

const router = express.Router();

//  Public routes
router.get("/", (req, res) => {
   res.send("Lista autores");
});

router.get("/:id", (req, res) => {
   res.send("Detalles autor");
});

// Protected routes
router.post("/", (req, res) => {
   res.send("Nuevo autor");
});

router.put("/:id", (req, res) => {
   res.send("Actualiza autor");
});

router.delete("/:id", (req, res) => {
   res.send("Elimina autor");
});

export default router;
