import { Request, Response } from "express";
import { Author } from "../models/Author";

// -----------------------------------------------------------------------------

export const authorController = {
   async create(req: Request, res: Response): Promise<void> {
      try {
         const { name, nationality } = req.body;

         if (!name || !nationality) {
            res.status(400).json({
               message: "All fields must be provided",
            });
            return;
         }

         const authorToCreate = Author.create({
            name,
            nationality,
         });

         await Author.save(authorToCreate);

         res.status(201).json({
            message: "Author has been created",
         });
      } catch (error) {
         res.status(500).json({
            message: "Failed to create author",
            error: (error as any).message,
         });
      }
   },

   async getAll(req: Request, res: Response): Promise<void> {
      try {
         const authors = await Author.find();

         if (authors.length === 0) {
            res.status(404).json({ message: "Authors not found" });
            return;
         }

         res.status(200).json(authors);
      } catch (error) {
         res.status(500).json({
            message: "Failed to retrieve authors",
         });
      }
   },

   async getById(req: Request, res: Response): Promise<void> {
      try {
         const authorId = Number(req.params.id);

         const author = await Author.findOne({
            where: { id: authorId },
         });

         if (!author) {
            res.status(404).json({ message: "Author not found" });
            return;
         }

         res.json(author);
      } catch (error) {
         res.status(500).json({
            message: "Failed to retrieve author",
         });
      }
   },

   async update(
      req: Request<{ id: string }, {}, Partial<Author>, {}>,
      res: Response
   ): Promise<void> {
      try {
         const authorId = Number(req.params.id);
         const { ...resAuthorData } = req.body;

         const authorToUpdate = await Author.findOne({
            where: { id: authorId },
         });
         if (!authorToUpdate) {
            res.status(404).json({ message: "Author not found" });
            return;
         }

         const updatedUser: Partial<Author> = {
            ...authorToUpdate,
            ...resAuthorData,
         };

         await Author.save(updatedUser);

         res.status(202).json({ message: "Author updated successfully" });
      } catch (error) {
         res.status(500).json({
            message: "Failed to update author",
         });
      }
   },

   async delete(req: Request, res: Response): Promise<void> {
      try {
         const authorId = Number(req.params.id);

         const deleteResult = await Author.delete(authorId);

         if (deleteResult.affected === 0) {
            res.status(404).json({ message: "Author not found" });
            return;
         }

         res.status(200).json({ message: "Author deleted successfully" });
      } catch (error) {
         res.status(500).json({
            message: "Failed to delete author",
         });
      }
   },
};
