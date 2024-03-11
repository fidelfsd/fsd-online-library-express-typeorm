import { Request, Response } from "express";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import { UserRoles } from "../constants/UserRoles";
import jwt from "jsonwebtoken";
import { TokenData } from "../types/types";

// -----------------------------------------------------------------------------

export const authController = {
   async register(req: Request, res: Response): Promise<void> {
      try {
         const { firstName, email, password } = req.body;

         if (!firstName || !email || !password) {
            res.status(400).json({
               message: "All fields must be provided",
            });
            return;
         }

         const hashedPassword = bcrypt.hashSync(password, 10);

         const userToCreate = User.create({
            firstName: firstName,
            email: email,
            password: hashedPassword,
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

   async login(req: Request, res: Response): Promise<void> {
      try {
         const { email, password } = req.body;

         if (!email || !password) {
            res.status(400).json({
               message: "All fields must be provided",
            });
            return;
         }

         const user = await User.findOne({
            relations: { role: true },
            select: { id: true, email: true, password: true },
            where: { email: email },
         });
         if (!user) {
            res.status(400).json({
               message: "Bad credentials",
            });
            return;
         }

         const isPasswordMatch = bcrypt.compareSync(password, user.password);
         if (!isPasswordMatch) {
            res.status(400).json({
               message: "Bad credentials",
            });
            return;
         }

         const tokenPayload: TokenData = {
            userId: user.id,
            userRole: user.role.name,
         };

         // generar token
         const token = jwt.sign(
            tokenPayload,
            process.env.JWT_SECRET as string,
            {
               expiresIn: "3h",
            }
         );

         res.status(200).json({
            message: "Login succesfully",
            token,
         });
      } catch (error) {
         res.status(500).json({
            message: "Failed to login user",
            error: (error as any).message, // TODO: remove on production
         });
      }
   },
};
