import { Response, Request, NextFunction } from "express";
import compression from "compression";

function shouldCompress(req: Request, res: Response) {
  if (req.headers["x-no-compression"]) {
    // don't compress responses if this request header is present
    return false;
  }
  // fallback to standard compression
  return compression.filter(req, res);
}

export function compressionMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (shouldCompress(req, res)) {
    // Apply compression using the "compression" library
    compression()(req, res, next);
  } else {
    next();
  }
}
