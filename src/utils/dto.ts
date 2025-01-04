import { instanceToPlain, plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { GymAppError } from "../interfaces/error.js";
import { Sanitizable } from "../dto/satinizable.dto.js";

export const validateDto = <T extends Sanitizable>(
  dtoClass: new () => T,
  whiteList: boolean = true,
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body) {
      return next(
        new GymAppError({
          message: "Peticion sin ningun body valido",
          name: "Error",
          status: 400,
        }),
      );
    }

    const dtoObject = plainToInstance(dtoClass, req.body, {
      excludeExtraneousValues: whiteList,
    });

    dtoObject.sanitize();

    const error = await validate(dtoObject);

    if (error.length > 0) {
      return next(error);
    }

    req.body = instanceToPlain(dtoObject);
    next();
  };
};
