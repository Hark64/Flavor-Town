import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { ToDo } from './todo';
import { Recipe } from './recipe';
import { Rating } from './rating';
import { Event } from './event';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id

    @ManyToOne(() => User, (user) => user.following) 
    following
    
    @ManyToOne(() => User, (user) => user.followers)
    followers


}