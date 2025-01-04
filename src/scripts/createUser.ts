import "reflect-metadata";
import { AppDataSource } from "../database/mongoDB.js";
import { User } from "../models/user.js";
import { Routine } from "../models/routine.js";
import { Exercise } from "../models/exercise.js";
import { Progress } from "../models/progress.js";

(async () => {
  try {
    // Inicializa la conexión a la base de datos
    await AppDataSource.initialize();
    console.log("[+] Conectado a la base de datos MongoDB");

    // Repositorios
    const userRepository = AppDataSource.getMongoRepository(User);
    const routineRepository = AppDataSource.getMongoRepository(Routine);
    const exerciseRepository = AppDataSource.getMongoRepository(Exercise);
    const progressRepository = AppDataSource.getMongoRepository(Progress);

    // Crea un nuevo usuario
    const newUser = new User();
    newUser.name = "John Doe";
    newUser.email = "johndoe@example.com";
    newUser.password = "hashedPassword123"; // Recuerda hashear esta contraseña
    newUser.age = 30;
    newUser.weight = 75.5;
    newUser.height = 1.8;

    const savedUser = await userRepository.save(newUser);
    console.log("[+] Usuario creado con éxito:", savedUser);

    // Crea una rutina
    const newRoutine = new Routine();
    newRoutine.name = "Full Body Workout";
    newRoutine.description = "A routine to work out your entire body.";
    newRoutine.user = savedUser;

    const savedRoutine = await routineRepository.save(newRoutine);
    console.log("[+] Rutina creada con éxito:", savedRoutine);

    // Crea ejercicios para la rutina
    const exercise1 = new Exercise();
    exercise1.name = "Push Ups";
    exercise1.description = "A basic push-up exercise.";
    exercise1.repetitions = 15;
    exercise1.sets = 3;
    exercise1.suggestedWeight = 0;
    exercise1.routine = savedRoutine;

    const exercise2 = new Exercise();
    exercise2.name = "Squats";
    exercise2.description = "A basic squat exercise.";
    exercise2.repetitions = 20;
    exercise2.sets = 3;
    exercise2.suggestedWeight = 0;
    exercise2.routine = savedRoutine;

    const savedExercise1 = await exerciseRepository.save(exercise1);
    const savedExercise2 = await exerciseRepository.save(exercise2);

    console.log("[+] Ejercicios creados con éxito:", [savedExercise1, savedExercise2]);

    // Crea progreso para la rutina
    const newProgress = new Progress();
    newProgress.user = savedUser;
    newProgress.routine = savedRoutine;
    newProgress.exercises = [
      {
        name: savedExercise1.name,
        setsCompleted: 3,
        repetitionsCompleted: 15,
        weightUsed: 0,
      },
      {
        name: savedExercise2.name,
        setsCompleted: 3,
        repetitionsCompleted: 20,
        weightUsed: 0,
      },
    ];

    const savedProgress = await progressRepository.save(newProgress);
    console.log("[+] Progreso creado con éxito:", savedProgress);

    process.exit(0); // Finaliza el script correctamente
  } catch (error) {
    console.error("[-] Error al ejecutar el script:", error);
    process.exit(1); // Finaliza el script con error
  }
})();
