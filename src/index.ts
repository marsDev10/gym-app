import  dotenv  from 'dotenv';
import "reflect-metadata";
dotenv.config();
import cors from "cors";
import { handleGenericError, handleGymAppError, handleJWTError, handleValidatorError } from './middlewares/error.middleware.js';
import express, { Application, Request, Response, NextFunction } from "express";
import { AppDataSource } from './database/mongoDB.js';

// configures dotenv to work in your application
//Routes
import Auth from './routes/auth.routes.js';
import Users from './routes/user.routes.js';
import Routines from './routes/routines.routes.js';
import bodyParser from 'body-parser';
import { requestLogger } from './middlewares/requestLogger.middleware.js';
import logger from './utils/logger.utils.js';
import { errorHandler } from './middlewares/errorHandler.middleware.js';
import { Authenticated } from './middlewares/authenticate.middleware.js';
import validateApiKey from './middlewares/accessApp.middleware.js';

(async () => {
  try {
    // Inicializa la conexión
    await AppDataSource.initialize();
    console.log("[+] Conectado a la base de datos MongoDB");

  } catch (error: unknown) {
    console.error("[-] Error al iniciar la base de datos:", error);
  }
})();

const app: Application = express();

const PORT = process.env.PORT || 3001;

const corsOptions = {
  origin: "*",
  methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "user-agent", "x-api-key"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.text());



app.use(validateApiKey);


app.use('/auth', Auth);

app.use(Authenticated);
app.use(requestLogger);
app.use(errorHandler);
app.use(handleJWTError);
app.use(handleValidatorError);
app.use(handleGymAppError);
app.use(handleGenericError);

app.use('/users', Users);
app.use('/routines', Routines);

app.get("/", (_req, res) => {
  res.send("Conectado a GymApp :D");
});

app.listen(PORT, () => { 
  console.log("Server running at PORT: ", PORT);
  logger.info("Servidor escuchando en http://localhost:3000");
}).on("error", (error) => {
  // gracefully handle error
  throw new Error(error.message);
})