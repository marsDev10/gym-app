import { TLoginUser, TRegisterUser } from '../../interfaces/user.interface.js';
import jwt from "jsonwebtoken";
import { getUserByEmail, getUserWithSelectedDataByEmail, isDuplucatedUser, validateLogin } from '../user/user.read.controller.js';
import { GymAppError } from '../../interfaces/error.interface.js';


export const registerUser = async (dataUser: TRegisterUser) => {
    // Verificar si el usuario existe
    const validated = await isDuplucatedUser(dataUser.email);

    return validated
}


