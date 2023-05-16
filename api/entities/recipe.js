import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user';

@Entity()
export class Recipe {
    @PrimaryGeneratedColumn()
    id

    @Column({type: 'varchar'})
    title

    @Column({type: 'varchar'})
    description

    @Column({type: 'varchar'})
    imagePath

    @ManyToOne(() => User, (user) => user.todos)
    user
}