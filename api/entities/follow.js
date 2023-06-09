import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { ToDo } from './todo';
import { Recipe } from './recipe';
import { Rating } from './rating';
import { Event } from './event';

// https://typeorm.biunav.com/en/many-to-many-relations.html#what-are-many-to-many-relations
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id

    @ManyToOne(() => User, (user) => user.following) 
    following
    
    @ManyToOne(() => User, (user) => user.followers)
    followers


}