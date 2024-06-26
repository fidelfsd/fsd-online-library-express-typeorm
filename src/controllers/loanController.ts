import { Request, Response, NextFunction } from "express";
import { Loan } from "../models/Loan";
import { User } from "../models/User";
import { Book } from "../models/Book";

export const loanController = {
   create: async function (req: Request, res: Response) {
      const { userId, bookId, loanDate, dueDate } = req.body;

      try {
         if (!userId || !bookId || !loanDate || !dueDate) {
            return res.status(400).json({
               message: "Invalid fields",
            });
         }

         const user = await User.findOneBy({ id: Number(userId) });
         const book = await Book.findOneBy({ id: Number(bookId) });

         if (!user || !book) {
            return res.status(404).json({ message: "User or Book not found" });
         }

         const loan = new Loan();
         loan.user = user;
         loan.book = book;
         loan.loanDate = new Date(loanDate);
         loan.dueDate = new Date(dueDate);

         await Loan.save(loan);

         res.json({
            message: "Loan created successfully",
         });
      } catch (error) {
         res.status(500).json({
            message: "Failed to create loan",
            error: (error as any).message,
         });
      }
   },

   getAll: async function (req: Request, res: Response) {
      try {
         const loans = await Loan.find({
            relations: ["user", "book"],
            select: {
               user: { firstName: true, email: true },
               book: { title: true },
            },
         });

         res.status(200).json(loans);
      } catch (error) {
         res.status(500).json({
            message: "Failed retreiving loans",
            error: (error as any).message,
         });
      }
   },

   getById: async function (req: Request, res: Response) {
      const loanId = req.params.id;

      try {
         const loan = await Loan.findOne({
            where: { id: Number(loanId) },
            relations: ["user", "book"],
            select: {
               user: { firstName: true, email: true },
               book: { title: true },
            },
         });

         if (!loan) {
            return res.status(404).json({
               message: "Loan not found",
            });
         }

         res.json(loan);
      } catch (error) {
         res.status(500).json({
            message: "Failed to retreive loan",
            error: (error as any).message,
         });
      }
   },

   update: async function (req: Request, res: Response) {
      const loanId = req.params.id;
      const { returnDate, ...loanData } = req.body;

      try {
         const loan = await Loan.findOneBy({ id: Number(loanId) });

         if (!loan) {
            return res.status(404).json({ message: "Loan not found" });
         }

         if (returnDate) {
            loan.returnDate = new Date(returnDate);
         }

         Object.assign(loan, loanData);

         await Loan.save(loan);

         res.json({
            message: "Loan updated successfully",
         });
      } catch (error) {
         res.status(500).json({
            message: "Failed to update loan",
            error: (error as any).message,
         });
      }
   },

   delete: async function (req: Request, res: Response) {
      const loanId = req.params.id;

      try {
         const loan = await Loan.findOneBy({ id: Number(loanId) });

         if (!loan) {
            return res.status(404).json({ message: "Loan not found" });
         }

         await Loan.remove(loan);

         res.json({
            message: "Loan deleted successfully",
         });
      } catch (error) {
         res.status(500).json({
            message: "Failed to delete loan",
            error: (error as any).message,
         });
      }
   },
};
