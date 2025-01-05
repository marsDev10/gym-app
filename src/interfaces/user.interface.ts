import { ObjectId } from "mongodb";

// Define una interfaz para representar al usuario con propiedades de solo lectura
export interface IUser {
  readonly _id: ObjectId; // ID del usuario, de solo lectura
  name: string;          // Nombre del usuario
  email: string;         // Correo electrónico
  password: string;      // Contraseña
  age: number;           // Edad del usuario
  weight: number;        // Peso del usuario
  height: number;        // Altura del usuario
  readonly createdAt: Date; // Fecha de creación, de solo lectura
}

export interface IResponseLogin {
    isLogged?: boolean | null;
    message?: string | null;
    user?: IUser | null;
}


// Tipo para registrar un nuevo usuario: todas las propiedades son opcionales excepto `name`, `email` y `password`
export type TRegisterUser = Pick<IUser, 'name' | 'email' | 'password'> & Partial<Omit<IUser, '_id' | 'createdAt'>>;

// Tipo para iniciar sesión: solo se necesita el correo electrónico y la contraseña
export type TLoginUser = Pick<IUser, 'email' | 'password'>;

export type TCreateUser = Pick<IUser, 'name' | 'email' | 'password'>;


// Tipo para actualizar información del usuario: permite modificar cualquier propiedad excepto el ID y la fecha de creación
export type TUpdateUser = Partial<Omit<IUser, '_id' | 'createdAt'>>;

// Ejemplo de utilidad adicional: usuario sin contraseña para enviar al cliente
export type TUserWithoutPassword = Omit<IUser, 'password'>;

