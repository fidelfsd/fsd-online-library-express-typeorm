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

router.get("/favorite-books", (req, res) => {
   res.send("get favorite_books");
});

router.post("/favorite-books", (req, res) => {
   res.send("post favorite_books");
});

router.delete("/favorite-books/:bookId", (req, res) => {
   res.send("delete favorite_books");
});

// Protected routes
router.get("/", (req, res) => {
   res.send("get users");
});

router.get("/:id", (req, res) => {
   res.send("get user by id");
});

router.put("/:id", (req, res) => {
   res.send("put user by id");
});

router.delete("/:id", (req, res) => {
   res.send("delete user by id");
});

router.get("/:id/loans", (req, res) => {
   res.send("get user loans by user id");
});

router.put("/:id/role", (req, res) => {
   res.send("modify user role by user id");
});

export default router;
