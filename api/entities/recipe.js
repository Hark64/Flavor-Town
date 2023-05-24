import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user';

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

    @ManyToOne(() => User, (user) => user.todos)
    user
}