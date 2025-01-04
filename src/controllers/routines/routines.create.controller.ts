import { AppDataSource } from "../../database/mongoDB.js";
import { Routine } from "../../models/routine.js";
import { IUser } from '../../interfaces/user.js';
import { User } from "../../models/user.js";

const routinesRepository = AppDataSource.getMongoRepository(Routine);

interface IRoutine {
    name: string;
    description: string;
    user: IUser
}

export const createRoutineByUser = async (routine: IRoutine, user: User) => {

    const newRoutine = new Routine();
    newRoutine.name = routine.name;
    newRoutine.description = routine.description;
    newRoutine.user = user;

    const savedRoutine = await routinesRepository.save(newRoutine);

    return savedRoutine;
}
