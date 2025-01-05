import { AppDataSource } from "../../database/mongoDB.js";
import { User } from "../../models/user.model.js";
import { TCreateUser } from "../../interfaces/user.interface.js";
import { encryptPassword } from "../../utils/crypt.utils.js";

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
}

