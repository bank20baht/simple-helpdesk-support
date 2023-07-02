import express, { NextFunction, Request, Response } from "express";
import ticket from "./routes/ticket";
import { compressionMiddleware } from "./middleware/compression";
import cors from "cors";
import swaggerDocs from "./utils/swagger";
import logger from "./utils/logger";

const port = 5000;
const app = express();

app.use(compressionMiddleware);
app.use(cors());
app.use(express.json());
app.use("/api/ticket", ticket);

// Create Swagger documentation
swaggerDocs(app, port);

app.listen(port, () => {
  logger.info(`App is running at http://localhost:${port} `);
});
