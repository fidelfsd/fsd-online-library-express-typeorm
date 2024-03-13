import express, { Application } from "express";
import cors from "cors";
import { corsOptions } from "./config/cors";
import dotenv from "dotenv";
import apiRoutes from "./routes/api.routes";
import baseRoutes from "./routes/base.routes";
import { handleNotFound } from "./middlewares/errorHandler";

// -----------------------------------------------------------------------------

dotenv.config();

const app: Application = express();

// Middlewares
app.use(express.json());
app.use(cors(corsOptions));

// Register Base route
app.use("/", baseRoutes);

// Register API routes
app.use("/api", apiRoutes);

// Handle 404 errors
app.use(handleNotFound);

export default app;
