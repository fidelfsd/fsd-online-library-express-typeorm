import { TokenData } from "./types";

declare global {
   // Express
   namespace Express {
      export interface Request {
         tokenData: TokenData;
      }
   }
}
