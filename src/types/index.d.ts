import { TokenData } from "./types";

declare global {
   // Express
   namespace Express {
      export interface Request {
         tokenData: TokenData;
      }
   }

   // NodeJs
   namespace NodeJS {
      export interface ProcessEnv {
         NODE_ENV: string;
         PORT: string;
         DB_HOST: string;
         DB_PORT: string;
         DB_USER: string;
         DB_PASSWORD: string;
         DB_DATABASE: string;
         JWT_SECRET: string;
      }
   }
}
