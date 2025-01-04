import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();

import { DataSource } from "typeorm"
import { User } from "../models/user.js";
import { Routine } from "../models/routine.js";
import { Exercise } from "../models/exercise.js";
import { Progress } from "../models/progress.js";

export const AppDataSource = new DataSource({
    type: "mongodb",
    host: "localhost",
    port: 27017,
    database: "gymdb",
    useNewUrlParser: true,
    useUnifiedTopology: true,
    entities: [
        User, 
        Routine,
        Exercise,
        Progress
    ],
    logging: true,
    synchronize: true, // Solo en desarrollo. No lo uses en producción.
});