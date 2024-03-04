import express from "express";

const router = express.Router();

// Users routes
router.get("/profile", (req, res) => {
   res.send("get profile");
});

router.put("/profile", (req, res) => {
   res.send("put profile");
});

router.get("/loans", (req, res) => {
   res.send("get loans");
});

router.get("/favorite_books", (req, res) => {
   res.send("get favorite_books");
});

router.post("/favorite_books", (req, res) => {
   res.send("post favorite_books");
});

router.delete("/favorite_books/:bookId", (req, res) => {
   res.send("delete favorite_books");
});

// Protected routes



export default router;
