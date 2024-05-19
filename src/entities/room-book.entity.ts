import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from './user.entity';
import { RoomManage } from './room-manage.entity';

@Entity()
export class RoomBook {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 150 })
  guestFullName: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 150 })
  phoneNumber: string;

  @Column({ type: 'int', default: 1 })
  totalRoom: number;

  @Column({ type: 'int', default: 1 })
  totalPerson: number;

  @Column({ type: 'date' })
  checkInDate: Date;

  @Column({ type: 'date' })
  checkOutDate: Date;

  @Column({ default: false })
  isCheckedIn: boolean;

  @Column({ default: false })
  isCheckedOut: boolean;

  @Column({ default: false })
  isBookingCanceled: boolean;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'loggedUserId', referencedColumnName: 'id' })
  loggedUser: User;

  @ManyToMany(() => RoomManage, (manageRooms) => manageRooms.manageRooms)
  @JoinTable({
    name: 'room-book_room-manage',
    joinColumn: {
      name: 'roomBookId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'roomManageId',
      referencedColumnName: 'id',
    },
  })
  bookRooms: RoomManage[];

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt: Date;
}
