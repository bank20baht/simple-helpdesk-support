import express, { NextFunction, Request, Response } from "express";
import ticket from "./routes/ticket";
import { compressionMiddleware } from "./middleware/compression";

const app = express();

app.use(compressionMiddleware);
app.use(express.json());
app.use("/api/ticket", ticket);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
