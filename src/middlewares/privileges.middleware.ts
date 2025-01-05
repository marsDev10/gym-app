import { NextFunction, Response, Request } from "express";
import { Privileges } from "../enums/privileges.enum.js";
import { GymAppError } from "../interfaces/error.interface.js";

export const validatePrivileges = (allowedPrivileges: Privileges[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const userPrivilege = req.privilege;
      if (!userPrivilege)
        throw new GymAppError({
          message: "Privilegio invalido, no se encontro privilegio",
          name: "Privilege",
          status: 400,
        });

      // Allow App for everything
      if (userPrivilege === Privileges.SuperAdmin) return next();

      const hasPrivileges = allowedPrivileges.includes(userPrivilege);

      if (!hasPrivileges)
        return res.status(403).send({
          message:
            "Acceso no autorizado: no cuenta con los privilegios suficientes",
        });

      next();
    } catch (error) {
      next(error);
    }
  };
};
