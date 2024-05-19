import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToMany,
} from 'typeorm';
import { RoomBook } from './room-book.entity';

@Entity()
export class RoomManage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', unique: true })
  roomNumber: number;

  @Column({ type: 'varchar', length: 200 })
  roomInfo: string;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'varchar', length: 15, default: 'single' })
  category: string;

  @ManyToMany(() => RoomBook, (bookRooms) => bookRooms.bookRooms)
  manageRooms: RoomBook;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt: Date;
}
