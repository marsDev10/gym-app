import { Request, Response, NextFunction } from "express";
import { verifyApiKey } from "../controllers/apiKey/apikey.read.controller.js";

async function validateApiKey(req: Request, res: Response, next: NextFunction) {
  
  const apiKey = req.headers["x-api-key"];
  
  if (!apiKey) {
    return res.status(401).json({ error: "API Key es requerida" });
  }

  const isValid = await verifyApiKey(apiKey as string);

  console.log({ isValid });

  if (!isValid) {
    return res.status(403).json({ error: "API Key inválida o inactiva" });
  }

  next();
}

export default validateApiKey;
