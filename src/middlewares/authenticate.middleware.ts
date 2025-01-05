import { NextFunction, Request, Response } from "express";
import { DecodedToken } from "../interfaces/decodedToken.interface.js";
import { GymAppError } from "../interfaces/error.interface.js";
import jwt from "jsonwebtoken";
import { getUserByEmail } from "../controllers/user/user.read.controller.js";

/**
 * Autentica a los usuarios mientras estan dentro del sitio
 */
export async function Authenticated(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      // Verificando existencia del token de autenticacion
      const token = req.headers["authorization"];
  
      if (!token) {
        return res.status(400).json({
          status: 400,
          error: "Usuario no autenticado",
        });
      }
  
      const decodedToken = jwt.verify(token, process.env.codigo!) as DecodedToken;
  
      // Token verification successfully
      if (!decodedToken.tokenUser)
        throw new GymAppError({
          message: "Token invalido",
          name: "Authenticate",
          status: 400,
        });

      req._id = decodedToken.tokenUser._id;
      req.name = decodedToken.tokenUser.name;
      req.email = decodedToken.tokenUser.email;
      req.privilege = decodedToken.tokenUser.privilege;

      const userToAuthenticated = await getUserByEmail(req?.email);
  
      if (!userToAuthenticated)
        // User doesn't exist
        throw new GymAppError({
          message: "Acceso Denegado",
          name: "Authenticate",
          status: 401,
        });
  
      next();
    } catch (error) {
      next(error);
    }
  }