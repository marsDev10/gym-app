import { NextFunction, Request, Response, Router } from "express";
import { getRoutineByUser } from "../controllers/routines/routines.read.controller.js";
import { validatePrivileges } from "../middlewares/privileges.middleware.js";
import { Privileges } from "../enums/privileges.enum.js";
import { Authenticated } from "../middlewares/authenticate.middleware.js";
import { requestLogger } from "../middlewares/requestLogger.middleware.js";

const router = Router();

router.get("/:userId",     
    validatePrivileges([
    Privileges.Admin,
    Privileges.Partner,
    Privileges.Customer,
  ]),
  async (_req: Request, res: Response, next: NextFunction) => {
    try {

        const { userId } = _req.params;

        const routines = await getRoutineByUser(userId)
 
        res.status(200).json({ routines });


    } catch (error){
        
        console.log("[-] Error al realizar la peticion:", error);
    }
});

router.post("/", async (_req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json({ message: "Rutina creada con éxito" });

    } catch (error) {
        console.log("[-] Error al realizar la peticion:", error);
    }
})

export default router;
