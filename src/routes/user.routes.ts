import { NextFunction, Request, Response, Router } from "express";
import { IUser } from "../interfaces/user.js";
import { createUser } from "../controllers/user/user.create.controller.js";

const router = Router();

router.post("/register", async (req: Request, res: Response, _next: NextFunction) => {
    try {

      const dataUser: IUser = req.body;

        const user = await createUser(dataUser);
 
        res
        .status(201)
        .json({ 
          message: "User created successfully",
          user,
        });


    } catch (error){
        
      res
      .status(500)
      .json({ 
        status: 500,
        message: "Error de servidor",
      });
    }
});

export default router;
