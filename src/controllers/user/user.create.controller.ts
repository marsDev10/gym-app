import { AppDataSource } from "../../database/mongoDB.js";
import { User } from "../../models/user.js";
import { TCreateUser } from "../../interfaces/user.js";
import bcrypt from 'bcrypt';
import { encryptPassword } from "../../utils/crypt.js";

const userRepository = AppDataSource.getMongoRepository(User);

export const createUser = async (dataUser: TCreateUser) => {
    try {

        const user = await userRepository.findOneBy({
            email: dataUser.email,
        });

        if(!user) {

            const newUser = new User(dataUser);
            const passwordCrypt = await encryptPassword(dataUser.password);

            const savedUser = await userRepository.save({
                ...newUser,
                password: passwordCrypt,
            });
            console.log("[+] Usuario creado con éxito:", savedUser);

            return savedUser;

        }
        // Verificar si el usuario ya existe

        console.log({ user });
   

    } catch (error) {
        console.error("Error al crear usuario:", error);
    }
}

