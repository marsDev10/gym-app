import { Entity, Column, ObjectIdColumn } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity()
export class ApiKey {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column({
    name: "key",
    type: "varchar", // La clave API será un string
    length: 255, // Longitud máxima que deseas para la clave
    unique: true,  // La clave API debe ser única
  })
  key: string;

  @Column({
    name: "name",
    type: "varchar",
    length: 150,
    nullable: false,
  })
  name: string;

  @Column({
    name: "isActive",
    type: "boolean",
    default: true, // La clave será activa por defecto
  })
  isActive: boolean;

  @Column({
    name: "createdAt",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP", // Fecha de creación
  })
  createdAt: Date;

  @Column({
    name: "expiresAt",
    type: "timestamp",
    nullable: true,  // Si la clave no tiene fecha de expiración, es opcional
  })
  expiresAt: Date;

  constructor(userData?: Partial<ApiKey>) {
    if (userData) {
      Object.assign(this, userData);
    }
  }
}
