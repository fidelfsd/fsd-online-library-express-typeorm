import { NextFunction, Request, Response } from "express";

export const sampleMiddleware = (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   console.log("Soy un Middleware");
   console.log(req.tokenData);

   next();
};
