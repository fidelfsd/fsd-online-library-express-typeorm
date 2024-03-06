import { Request, Response } from "express";
import { User } from "../models/User";

// -----------------------------------------------------------------------------

export const userController = {
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
};
