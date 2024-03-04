import express from "express";

const router = express.Router();

// Users routes
router.get("/profile", (req, res) => {
   res.send("Detalles del perfil");
});

router.put("/profile", (req, res) => {
   res.send("Actualiza perfil");
});

router.get("/loans", (req, res) => {
   res.send("Obtener mis préstamos");
});

router.get("/favorite-books", (req, res) => {
   res.send("Obtener mis favoritos");
});

router.post("/favorite-books", (req, res) => {
   res.send("Agregar mi favorito");
});

router.delete("/favorite-books/:bookId", (req, res) => {
   res.send("Eliminar mi favorito");
});

// Protected routes
router.get("/", (req, res) => {
   res.send("Lista de usuarios");
});

router.get("/:id", (req, res) => {
   res.send("Detalles de usuario");
});

router.put("/:id", (req, res) => {
   res.send("Actualiza usuario");
});

router.delete("/:id", (req, res) => {
   res.send("Elimina usuario");
});

router.get("/:id/loans", (req, res) => {
   res.send("Préstamos por usuario");
});

router.put("/:id/role", (req, res) => {
   res.send("Cambiar rol");
});

export default router;
