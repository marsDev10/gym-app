import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    ObjectIdColumn,
  } from 'typeorm';
  import { Routine } from './routine.model.js';
import { ObjectId } from 'mongodb';
  
  @Entity()
  export class Exercise {
    @ObjectIdColumn()
    _id: ObjectId;
  
    @Column({ type: 'text', length: 100 })
    name: string;
  
    @Column({ type: 'text', nullable: true })
    description: string;
  
    @Column({ type: 'int' })
    repetitions: number;
  
    @Column({ type: 'int' })
    sets: number;
  
    @Column({ type: 'float', nullable: true })
    suggestedWeight: number;
  
    @ManyToOne(() => Routine, (routine) => routine.exercises, {
      onDelete: 'CASCADE',
    })
    routine: Routine;
  }
  