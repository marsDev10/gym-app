// types/express.d.ts
import 'express';

declare module 'express' {
    export interface Request {
        rawBody?: string; // Declarar rawBody como opcional
    }
}
