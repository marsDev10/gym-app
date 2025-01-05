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
  allowedHeaders: ["Content-Type", "Authorization", "user-agent", "api-key"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.text());


app.use('/auth', Auth);
app.use('/users', Users);
app.use('/routines', Routines);

app.get("/", (_req, res) => {
  res.send("Conectado a GymApp :D");
});


app.use(handleJWTError);
app.use(handleValidatorError);
app.use(handleGymAppError);
app.use(handleGenericError);

app.listen(PORT, () => { 
  console.log("Server running at PORT: ", PORT); 
}).on("error", (error) => {
  // gracefully handle error
  throw new Error(error.message);
})