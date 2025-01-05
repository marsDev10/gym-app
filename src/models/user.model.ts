import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  ObjectIdColumn,
} from 'typeorm';
import { Progress } from './progress.model.js';
import { IsEmail } from 'class-validator';
import { ObjectId } from 'mongodb';
import { Routine } from './routine.model.js';

@Entity()
export class User {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column({
    name: "name",
    nullable: false,
    type: "varchar",
    length: 150,
  })
  name: string;

  @Column({
    name: "email",
    nullable: false,
    type: "varchar",
  })
  @IsEmail()
  email: string;

  @Column({
      name: "password",
      nullable: false,
      type: "varchar",
  })
  password: string; // Hash your passwords in your services

  @Column({ type: 'int', nullable: true })
  age: number;

  @Column({ type: 'float', nullable: true })
  weight: number;

  @Column({ type: 'float', nullable: true })
  height: number;

  @Column({ 
    name: "privilege",
    nullable: false,
    type: "int"
  })
  privilege: number;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Progress, (progress) => progress.user)
  progress: Progress[];

  @OneToMany(() => Routine, (routine) => routine.user)
  routines: Routine[]; // Relación de uno a muchos

  constructor(userData?: Partial<User>) {
    if (userData) {
      Object.assign(this, userData);
    }
  }
}
