import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToMany,
    ObjectIdColumn,
    ManyToOne,
  } from 'typeorm';
  import { Progress } from './progress.model.js';
  import { Exercise } from './exercise.model.js';
import { ObjectId } from 'mongodb';
import { User } from './user.model.js';
  
  @Entity()
  export class Routine {
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
      name: "description",
      nullable: false,
      type: "varchar",
      length: 150,
    })
    description: string;

    @ManyToOne(() => User, (user) => user.routines)
    user: User; // Relación ManyToOne
  
    @OneToMany(() => Exercise, (exercise) => exercise.routine, { cascade: true })
    exercises: Exercise[];
  
    @OneToMany(() => Progress, (progress) => progress.routine)
    progress: Progress[];
  
    @CreateDateColumn()
    createdAt: Date;
  }
  