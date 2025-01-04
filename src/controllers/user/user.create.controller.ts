import { AppDataSource } from "../../database/mongoDB.js";
import { User } from "../../models/user.js";
import { TCreateUser } from "../../interfaces/user.js";
import { encryptPassword } from "../../utils/crypt.js";

const userRepository = AppDataSource.getMongoRepository(User);

export const createUser = async (dataUser: TCreateUser) => {
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

            return savedUser;

        }
        // Verificar si el usuario ya existe
        console.log({ user });
}

