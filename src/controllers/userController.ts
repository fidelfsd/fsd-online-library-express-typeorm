import { Request, Response } from "express";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import { UserRoles } from "../constants/UserRoles";
import { Role } from "../models/Role";
import { Book } from "../models/Book";

// -----------------------------------------------------------------------------

export const userController = {
   async create(req: Request, res: Response): Promise<void> {
      try {
         const { firstName, lastName, email, password, isActive } = req.body;

         if (!firstName || !lastName || !email || !password || !isActive) {
            res.status(400).json({
               message: "All fields must be provided",
            });
            return;
         }

         const hashedPassword = bcrypt.hashSync(password, 10);

         const userToCreate = User.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword,
            isActive: isActive,
            role: UserRoles.CLIENT,
         });

         // Guardar en la base de datos
         await User.save(userToCreate);

         res.status(201).json({
            message: "User has been created",
         });
      } catch (error) {
         res.status(500).json({
            message: "Failed to create user",
            error: (error as any).message, // TODO: remove on production
         });
      }
   },

   async getAll(req: Request, res: Response): Promise<void> {
      try {
         const page = Number(req.query.page) || 1;
         const limit = Number(req.query.limit) || 10;

         const [users, totalUsers] = await User.findAndCount({
            relations: {
               role: true,
            },
            select: {
               role: {
                  name: true,
               },
            },
            skip: (page - 1) * limit,
            take: limit,
         });

         if (totalUsers === 0) {
            res.status(404).json({ message: "Users not found" });
            return;
         }

         const totalPages = Math.ceil(totalUsers / limit);

         res.status(200).json({
            users: users,
            current_page: page,
            per_page: limit,
            total_pages: totalPages,
         });
      } catch (error) {
         res.status(500).json({
            message: "Failed to retrieve users",
         });
      }
   },

   async getById(req: Request, res: Response): Promise<void> {
      try {
         const userId = Number(req.params.id);

         const user = await User.findOne({
            relations: {
               role: true,
            },
            where: { id: userId },
         });

         if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
         }

         res.json(user);
      } catch (error) {
         res.status(500).json({
            message: "Failed to retrieve user",
         });
      }
   },

   async update(
      req: Request<{ id: string }, {}, Partial<User>, {}>,
      res: Response
   ): Promise<void> {
      // Request<Params, Response, Body, Query>,
      try {
         const userId = Number(req.params.id);
         const { password, role, ...resUserData } = req.body;

         const userToUpdate = await User.findOne({
            where: { id: userId },
         });
         if (!userToUpdate) {
            res.status(404).json({ message: "User not found" });
            return;
         }

         if (password) {
            const hashedPassword = bcrypt.hashSync(password, 10);
            userToUpdate.password = hashedPassword;
         }

         const updatedUser: Partial<User> = {
            ...userToUpdate,
            ...resUserData,
         };

         await User.save(updatedUser);

         res.status(202).json({ message: "User updated successfully" });
      } catch (error) {
         res.status(500).json({
            message: "Failed to update user",
         });
      }
   },

   async delete(req: Request, res: Response): Promise<void> {
      try {
         const userId = Number(req.params.id);

         const deleteResult = await User.delete(userId);

         if (deleteResult.affected === 0) {
            res.status(404).json({ message: "User not found" });
            return;
         }

         res.status(200).json({ message: "User deleted successfully" });
      } catch (error) {
         res.status(500).json({
            message: "Failed to delete user",
         });
      }
   },

   async getLoansByUserId(req: Request, res: Response): Promise<void> {
      try {
         const userId = Number(req.params.id);

         const user = await User.findOne({
            relations: {
               loans: {
                  book: true,
               },
            },
            select: {
               loans: {
                  id: true,
                  book: {
                     id: true,
                     title: true,
                     gender: true,
                  },
                  loanDate: true,
                  dueDate: true,
                  returnDate: true,
               },
            },
            where: {
               id: userId,
            },
         });

         if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
         }

         const userLoans = user.loans;
         if (userLoans?.length === 0) {
            res.status(404).json({ message: "Loans not found" });
            return;
         }

         res.status(200).json(userLoans);
      } catch (error) {
         res.status(500).json({
            message: "Failed to retreive loans",
         });
      }
   },

   async updateRole(req: Request, res: Response): Promise<void> {
      try {
         const userId = Number(req.params.id);
         const roleId = req.body.roleId;

         const userToUpdate = await User.findOne({
            where: {
               id: userId,
            },
         });
         if (!userToUpdate) {
            res.status(404).json({ message: "User not found" });
            return;
         }

         const roleToUpdate = await Role.findOne({
            where: {
               id: roleId,
            },
         });
         if (!roleToUpdate) {
            res.status(400).json({ message: "Invalid role" });
            return;
         }

         userToUpdate.role = roleToUpdate;

         await User.save(userToUpdate);

         res.status(202).json({
            message: "Role updated successfully",
         });
      } catch (error) {
         res.status(500).json({
            message: "Failed to update user role",
         });
      }
   },

   async getProfile(req: Request, res: Response): Promise<void> {
      try {
         const userId = req.tokenData.userId;

         const user = await User.findOne({
            relations: {
               role: true,
            },
            where: { id: userId },
         });

         res.json(user);
      } catch (error) {
         res.status(500).json({
            message: "Failed to retrieve user",
         });
      }
   },

   async updateProfile(
      req: Request<{}, {}, Partial<User>, {}>,
      res: Response
   ): Promise<void> {
      // Request<Params, Response, Body, Query>,
      try {
         const userId = req.tokenData.userId;
         const { password, role, ...resUserData } = req.body;

         const userToUpdate = await User.findOne({
            where: { id: userId },
         });

         if (password) {
            const hashedPassword = bcrypt.hashSync(password, 10);
            userToUpdate!.password = hashedPassword;
         }

         const updatedUser: Partial<User> = {
            ...userToUpdate,
            ...resUserData,
         };

         await User.save(updatedUser);

         res.status(202).json({ message: "User updated successfully" });
      } catch (error) {
         res.status(500).json({
            message: "Failed to update user",
         });
      }
   },

   async getUserLoans(req: Request, res: Response): Promise<void> {
      try {
         const userId = req.tokenData.userId;

         const user = await User.findOne({
            relations: {
               loans: {
                  book: true,
               },
            },
            select: {
               loans: {
                  id: true,
                  book: {
                     id: true,
                     title: true,
                     gender: true,
                  },
                  loanDate: true,
                  dueDate: true,
                  returnDate: true,
               },
            },
            where: {
               id: userId,
            },
         });

         const userLoans = user!.loans;
         if (userLoans?.length === 0) {
            res.status(404).json({ message: "Loans not found" });
            return;
         }

         res.status(200).json(userLoans);
      } catch (error) {
         res.status(500).json({
            message: "Failed to retreive loans",
         });
      }
   },

   async getFavoriteBooks(req: Request, res: Response): Promise<void> {
      try {
         const userId = req.tokenData.userId;

         const user = await User.findOne({
            relations: {
               favoriteBooks: {
                  author: true,
               },
            },
            where: { id: userId },
         });

         const favoriteBooks = user?.favoriteBooks;
         if (favoriteBooks?.length === 0) {
            res.status(404).json({ message: "No favorite books where found" });
            return;
         }

         res.status(200).json(favoriteBooks);
      } catch (error) {
         res.status(500).json({
            message: "Failed to retreive favorite books",
         });
      }
   },

   async addFavoriteBook(req: Request, res: Response): Promise<void> {
      try {
         const userId = req.tokenData.userId;
         const bookId = Number(req.body.bookId);

         const userToUpdate = await User.findOne({
            relations: {
               favoriteBooks: true,
            },
            where: { id: userId },
         });

         const bookToAdd = await Book.findOne({ where: { id: bookId } });
         if (!bookToAdd) {
            res.status(400).json({ message: "Book not found" });
            return;
         }

         userToUpdate?.favoriteBooks?.push(bookToAdd);

         await User.save(userToUpdate!);

         res.status(201).json({
            message: "Favorite book added successfully",
         });
      } catch (error) {
         res.status(500).json({
            message: "Failed to add favorite book",
         });
      }
   },

   async deleteBookFromFavorites(req: Request, res: Response): Promise<void> {
      try {
         const userId = req.tokenData.userId;
         const bookId = Number(req.body.bookId);

         const userToUpdate = await User.findOne({
            relations: {
               favoriteBooks: true,
            },
            where: { id: userId },
         });

         const bookToRemove = await Book.findOne({ where: { id: bookId } });
         if (!bookToRemove) {
            res.status(400).json({ message: "Book not found" });
            return;
         }

         userToUpdate!.favoriteBooks = userToUpdate!.favoriteBooks?.filter(
            (book) => {
               return book.id !== bookToRemove.id;
            }
         );

         await User.save(userToUpdate!);

         res.status(200).json({
            message: "Favorite book deleted successfully",
         });
      } catch (error) {
         res.status(500).json({
            message: "Failed to delete favorite book",
         });
      }
   },
};
