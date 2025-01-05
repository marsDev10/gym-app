import { createLogger, format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

// Crear el logger
const logger = createLogger({
  level: "info", // Nivel mínimo de log (puede ser: error, warn, info, debug)
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), // Agrega la fecha y hora
    format.errors({ stack: true }), // Muestra el stack de errores
    format.printf(({ level, message, timestamp, stack }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${stack || message}`;
    })
  ),
  transports: [
    // Log en la consola
    new transports.Console({
      format: format.combine(
        format.colorize(), // Colorea los niveles de log
        format.printf(({ level, message, timestamp }) => {
          return `${timestamp} [${level.toUpperCase()}]: ${message}`;
        })
      ),
    }),
    

    // Log en archivos rotativos (diarios)
    new DailyRotateFile({
      dirname: "logs", // Carpeta donde se guardarán los logs
      filename: "app-%DATE%.log", // Nombre del archivo
      datePattern: "YYYY-MM-DD", // Rotación diaria
      zippedArchive: true, // Comprimir logs antiguos
      maxSize: "20m", // Tamaño máximo por archivo
      maxFiles: "14d", // Guardar logs por 14 días
    }),
  ],
});

// Cambiar el nivel de log en desarrollo
if (process.env.NODE_ENV === "development") {
  logger.level = "debug";
}

export default logger;
