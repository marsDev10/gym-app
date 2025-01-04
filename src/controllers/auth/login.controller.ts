import { AppDataSource } from '../../database/mongoDB.js';
import { User } from '../../models/user.js';
import { IUser, TLoginUser } from '../../interfaces/user.js';
import bcrypt from 'bcrypt';
import { getUserByEmail, getUserWithSelectedDataByEmail, validateLogin } from '../user/user.read.controller.js';
import { GymAppError } from '../../interfaces/error.js';


export const loginUser = async (dataUser: TLoginUser) => {
    // Verificar si el usuario existe
    const validated = await validateLogin(
        dataUser.email, 
        dataUser.password
    );

    if (!validated.acceso)
    throw new GymAppError({
        message: validated.message,
        name: "Login",
        status: 400,
    });

    const userToLogin = await getUserWithSelectedDataByEmail(dataUser.email);

    if (!userToLogin)
    throw new GymAppError({
      message: "No existe el usuario especificado",
      name: "Login",
      status: 400,
    });


    return userToLogin;
}


