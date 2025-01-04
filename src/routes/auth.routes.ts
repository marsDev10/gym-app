import { NextFunction, Request, Response, Router } from "express";
import { loginUser } from "../controllers/auth/login.controller.js";
import { LoginDto } from "../dto/auth/login.js";
import { validateDto } from "../utils/dto.js";

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
      ...userLoginData,
    });
  } catch (error) {
    next(error);
  }


});

export default router;
