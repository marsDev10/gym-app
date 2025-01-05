import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger.utils.js";

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  logger.http(`${req.method} ${req.url} - USER: [${req.email}]`);
  next();
};
