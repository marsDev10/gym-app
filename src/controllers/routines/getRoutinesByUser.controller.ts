import { AppDataSource } from "../../database/mongoDB.js";
import { User } from "../../models/user.js";
import { Routine } from "../../models/routine.js";

const userRepository = AppDataSource.getRepository(User);
const routinesRepository = AppDataSource.getMongoRepository(Routine);

export const getRoutineByUser = async (userId: string) => {

        console.log({ userId });

        // Realiza la búsqueda de rutinas asociadas al usuario
        const userWithRoutines = await routinesRepository.find({
            relations: ["user"],
            where: {
                "user.name": { $eq: userId },
            },
        });

        console.log({ userWithRoutines });

        return userWithRoutines;
}
