import { NextFunction, Request, Response } from "express";
import { GymAppError } from "../interfaces/error.interface.js";
import { ValidationError } from "class-validator";
import jwt from "jsonwebtoken";
import axios from "axios";

// Xperience error

export const handleGymAppError = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!(error instanceof GymAppError)) return next(error);

  console.error(`[ ${error.source} ! ]`, error.message);
  return res.status(error.status || 500).send({
    status: error.status,
    error: error.message,
  });
};

// JWT error

export const handleJWTError = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error instanceof jwt.TokenExpiredError)
    return res.status(403).send({
      status: 401,
      error: "Token expirado",
    });

  if (error instanceof jwt.JsonWebTokenError)
    return res.status(403).send({
      status: 401,
      error: "Token invalido",
    });

  if (error instanceof jwt.NotBeforeError)
    return res.status(403).send({
      status: 401,
      error: "Token viajero del tiempo",
    });

  next(error);
};

// Class-validator errors (Dto, models)

interface IFormatedError {
  property: string;
  value: any;
  constrains: string[];
}

const formatValidatorError = (validationErrors: ValidationError[]) => {
  return validationErrors.map((error) => {
    const formatedError: IFormatedError = {
      property: error.property,
      value: error.value,
      constrains: [],
    };

    if (error.children && error.children.length > 0) {
      formatedError["constrains"] = formatValidatorError(
        error.children,
      ).flatMap((child) => child.constrains);
    } else {
      formatedError["constrains"] = Object.values(error.constraints || {});
    }

    return formatedError;
  });
};

export const handleValidatorError = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (
    !Array.isArray(error) ||
    !error.every((e) => e instanceof ValidationError)
  )
    return next(error);

  const validationErrors = formatValidatorError(error);

  const messageError =
    validationErrors.length > 0
      ? validationErrors[0].constrains[0]
      : "Error de validación";

  return res.status(400).send({
    status: 400,
    message: messageError,
    error: validationErrors,
  });
};

// Unhandled errors - Generic errors

export const handleGenericError = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.log("[ Error !] Error generico");
  console.log(error);
  return res.status(500).send({
    status: 500,
    error: "Error interno",
  });
};

// Axios error
export const externalHttpRequestError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status || 500;
    const message = error.response?.data || "Error en el SERVICIO de Whatsapp";

    throw new GymAppError({
      message: message,
      name: "Axios",
      status: status,
    });
  }
  throw new GymAppError({
    message: "Error generico de axios",
    name: "Axios",
    status: 500,
  });
};
