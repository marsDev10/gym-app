import { AppDataSource } from "../../database/mongoDB.js";
import { User } from "../../models/user.js";
import { TCreateUser, TUpdateUser } from "../../interfaces/user.js";
import bcrypt from 'bcrypt';
import { encryptPassword } from "../../utils/crypt.js";
import { GymAppError } from "../../interfaces/error.js";

const userRepository = AppDataSource.getMongoRepository(User);

/**
 * Valida los datos del login y verifica que exista el usuario
 */
export async function validateLogin(
    user: string,
    password: string,
  ) {
    // Busca el usuario
    const found = await getUserByEmail(user);
  
    if (!found)
      return {
        acceso: false,
        message: "No existe el usuario especificado",
      };
  
    // Si esta activo el usuario compara las contraseñas
    const exito = { acceso: true, message: "Solicitud procesada" };
    const fracaso = {
      acceso: false,
      message: "Los datos ingresados son incorrectos",
    };
  
    const access = bcrypt.compareSync(password, found.password);
    return access ? exito : fracaso;
  }

/**
 * Regresa los datos del usuario a partir del correo
 */
export const getUserByEmail = async (email: string) => {
    try {

        const user = await userRepository.findOneBy({
            email,
        });

        return user;

    } catch (error) {
        console.error("Error al crear usuario:", error);
    }
}

/**
 * Returns the user info selected using his/her id
 */
export async function getUserWithSelectedDataByEmail(
    email: string,
    withDeleted = false,
  ) {
    const userData = await userRepository.findOneBy({
      where: { email },
      select: ["name"]
    });
  
    if (!userData)
      throw new GymAppError({
        message: "Usuario no encontrado",
        name: "User",
        status: 404,
      });
  
    return userData;
  }


