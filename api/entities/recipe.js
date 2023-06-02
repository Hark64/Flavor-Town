import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, AfterUpdate, AfterInsert } from 'typeorm';
import { User } from './user';
import { Rating } from './rating';

@Entity()
export class Recipe {
    @PrimaryGeneratedColumn()
    id

    @Column({type: 'varchar', nullable: false})
    title

    @Column({type: 'varchar', nullable: false})
    description

    @Column({type: 'varchar', nullable: false})
    videoLink

    @Column({type: 'varchar', nullable: false})
    fileName

    @Column({type: 'numeric', default: 0})
    avgScore

    @ManyToOne(() => User, (user) => user.recipes)
    user

    @OneToMany(() => Rating, (rating) => rating.recipe) 
    ratings

}