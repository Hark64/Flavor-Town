import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
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

    @Column({type: 'varchar'})
    videoLink

    @Column({type: 'varchar'})
    fileName

    @Column({type: 'numeric', default: 0})
    score

    @ManyToOne(() => User, (user) => user.recipes)
    user

    @OneToMany(() => Rating, (rating) => rating.recipe) 
    ratings
}