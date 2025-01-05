import { NextFunction, Request, Response, Router } from "express";
import { loginUser } from "../controllers/auth/login.create.controller.js";
import { LoginDto } from "../dto/auth/login.js";
import { validateDto } from "../utils/dto.utils.js";
import { IUser } from "../interfaces/user.interface.js";
import { registerUser } from "../controllers/auth/register.create.controller.js";
import { createUser } from "../controllers/user/user.create.controller.js";

const router = Router();

router.post(
  "/login", 
  validateDto(LoginDto),
  async (req: Request, res: Response, next: NextFunction) => {
  try {
    const dataUser: LoginDto = req.body;

    const userLoginData = await loginUser(dataUser);

    return res.status(200).json({
      status: 200,
      message: "User logged in successfully",
      user: {
        ...userLoginData,
      }
    });
  } catch (error) {
    next(error);
  }
});

router.post("/register", 
  async (req: Request, res: Response, _next: NextFunction) => {
    try {

      const dataUser: IUser = req.body;

        const user = await registerUser(dataUser);
 
        if(!user){

          const user = await createUser(dataUser);

          res
          .status(201)
          .json({ 
            message: "User created successfully",
            user,
          });
          
          return;
        }
        
        res
        .status(409)
        .json({
          status: 409,
          message: "Ya existe un usuario con ese correo"
        })


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
