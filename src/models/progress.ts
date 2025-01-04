import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    ObjectIdColumn,
  } from 'typeorm';
  import { User } from './user.js';
  import { Routine } from './routine.js';
import { ObjectId } from 'mongodb';
  
  @Entity()
  export class Progress {
   @ObjectIdColumn()
    _id: ObjectId;
  
    @ManyToOne(() => User, (user) => user.progress, { onDelete: 'CASCADE' })
    user: User;
  
    @ManyToOne(() => Routine, (routine) => routine.progress, { onDelete: 'CASCADE' })
    routine: Routine;
  
    @Column({ type: 'jsonb' })
    exercises: {
      name: string;
      setsCompleted: number;
      repetitionsCompleted: number;
      weightUsed: number;
    }[];
  
    @CreateDateColumn()
    startedAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }
  