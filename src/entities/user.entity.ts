import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { RoomBook } from './room-book.entity';

export enum UserRole {
  ADMIN = 'admin',
  EDITOR = 'editor',
  EMPLOYEE = 'employee',
  USER = 'user',
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'OTHER',
}

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

  @Column({ type: 'varchar', length: 100, nullable: true })
  refreshtoken: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: [UserRole.USER],
  })
  role: UserRole[];

  @Column({
    type: 'enum',
    enum: Gender,
  })
  gender: Gender;

  @OneToMany(() => RoomBook, (roomBook) => roomBook.loggedUser)
  roomBooks: RoomBook[];

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt: Date;
}
