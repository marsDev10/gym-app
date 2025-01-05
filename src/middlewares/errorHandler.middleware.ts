import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger.utils.js";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error(`Error en ${req.method} ${req.url}: ${err.message}`, { stack: err.stack });
  res.status(err.status || 500).json({ message: err.message || "Error interno del servidor" });
};
