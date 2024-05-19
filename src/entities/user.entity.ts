import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { RoomBook } from './room-book.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 150, nullable: true })
  fullName: string;

  @Column({ type: 'varchar', length: 150, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 150 })
  password: string;

  @Column({ type: 'varchar', length: 150, unique: true })
  phone: string;

  @Column({ type: 'int' })
  age: number;

  @OneToMany(() => RoomBook, (roomBook) => roomBook.loggedUser)
  roomBooks: RoomBook[];

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt: Date;
}
