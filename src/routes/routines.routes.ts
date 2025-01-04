import { NextFunction, Request, Response, Router } from "express";
import { getRoutineByUser } from "../controllers/routines/getRoutinesByUser.controller.js";

const router = Router();

router.get("/:userId", async (_req: Request, res: Response, next: NextFunction) => {
    try {

        const { userId } = _req.params;

        const routines = await getRoutineByUser(userId)
 
        res.status(200).json({ routines });


    } catch (error){
        
        console.log("[-] Error al realizar la peticion:", error);
    }
});

export default router;
