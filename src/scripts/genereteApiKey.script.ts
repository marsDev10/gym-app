import "reflect-metadata";
import { AppDataSource } from "../database/mongoDB.js";

import { ApiKey } from "../models/apikeys.model.js";
import crypto from "crypto";

const apiKeyRepository = AppDataSource.getMongoRepository(ApiKey);

function generateApiKey(): string {
  return crypto.randomBytes(32).toString("hex"); // Genera una clave de 64 caracteres
}


async function createApiKey(name: string) {
    try {

  const newApiKey = new ApiKey({
    name: name,
    key: generateApiKey(), // Genera una nueva API Key
    isActive: true, // Activa por defecto
    createdAt: new Date(),
  });

      await apiKeyRepository.save(newApiKey);

    } catch(err){

        console.log(err);

    }
}

(async () => {
        // Inicializa la conexión a la base de datos
        await AppDataSource.initialize();
        console.log("[+] Conectado a la base de datos MongoDB");

    createApiKey("General");
})()
