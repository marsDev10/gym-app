import { JwtPayload } from "jsonwebtoken";
import { ObjectId } from "mongodb";

/**
 * Interfaz para decodificar el token de autenticacion
 */
export interface DecodedToken extends JwtPayload {
    tokenUser: {
      _id?: ObjectId;
      email: string;
      name?: string;
    };
  }
  