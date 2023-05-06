import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id

  @Column({ type: 'varchar', unique: true })  // Unique automatically includes nullable: false. 
  email

  @Column({ type: 'varchar', nullable: false })
  password

  @Column({type: 'varchar', nullable: false })
  firstName

  @Column({type: 'varchar', nullable: false })
  lastName
}
