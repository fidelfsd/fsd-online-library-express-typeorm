import { Request, Response } from "express";
import { Book } from "../models/Book";
import { Author } from "../models/Author";

// -----------------------------------------------------------------------------

export const bookController = {
   async create(req: Request, res: Response): Promise<void> {
      try {
         const { title, gender, authorId } = req.body;

         if (!title || !gender || !authorId) {
            res.status(400).json({
               message: "All fields must be provided",
            });
            return;
         }

         const author = await Author.findOne({ where: { id: Number(authorId) } });

         if (!author) {
            res.status(400).json({
               message: "Author not found",
            });
            return;
         }

         const bookToCreate = Book.create({
            title,
            gender,
            author,
         });

         await Book.save(bookToCreate);

         res.status(201).json({
            message: "Book has been created",
         });
      } catch (error) {
         res.status(500).json({
            message: "Failed to create book",
            error: (error as any).message,
         });
      }
   },

   async getAll(req: Request, res: Response): Promise<void> {
      try {
         const books = await Book.find();

         if (books.length === 0) {
            res.status(404).json({ message: "Books not found" });
            return;
         }

         res.status(200).json(books);
      } catch (error) {
         res.status(500).json({
            message: "Failed to retrieve books",
         });
      }
   },

   async getById(req: Request, res: Response): Promise<void> {
      try {
         const bookId = Number(req.params.id);

         const book = await Book.findOne({
            where: { id: bookId },
         });

         if (!book) {
            res.status(404).json({ message: "Book not found" });
            return;
         }

         res.json(book);
      } catch (error) {
         res.status(500).json({
            message: "Failed to retrieve book",
         });
      }
   },

   async update(
      req: Request<{ id: string }, {}, Partial<Book>, {}>,
      res: Response
   ): Promise<void> {
      try {
         const bookId = Number(req.params.id);
         const { ...resBookData } = req.body;

         const bookToUpdate = await Book.findOne({
            where: { id: bookId },
         });
         if (!bookToUpdate) {
            res.status(404).json({ message: "Book not found" });
            return;
         }

         const updatedBook: Partial<Book> = {
            ...bookToUpdate,
            ...resBookData,
         };

         await Book.save(updatedBook);

         res.status(202).json({ message: "Book updated successfully" });
      } catch (error) {
         res.status(500).json({
            message: "Failed to update book",
         });
      }
   },

   async delete(req: Request, res: Response): Promise<void> {
      try {
         const bookId = Number(req.params.id);

         const deleteResult = await Book.delete(bookId);

         if (deleteResult.affected === 0) {
            res.status(404).json({ message: "Book not found" });
            return;
         }

         res.status(200).json({ message: "Book deleted successfully" });
      } catch (error) {
         res.status(500).json({
            message: "Failed to delete author",
         });
      }
   },
};
