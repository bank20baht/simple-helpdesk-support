import express, { NextFunction, Request, Response } from "express";
import ticket from "./routes/ticket";
import { compressionMiddleware } from "./middleware/compression";
import cors from "cors";

const app = express();

app.use(compressionMiddleware);
app.use(cors());
app.use(express.json());
app.use("/api/ticket", ticket);

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
