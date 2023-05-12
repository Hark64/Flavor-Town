import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Event {
    @PrimaryGeneratedColumn()
    id

    @Column({ type: 'varchar', unique: true })
    title

    @Column({ type: 'varchar', nullable: false })
    location

    @Column({ type: 'varchar', nullable: false })
    description
}