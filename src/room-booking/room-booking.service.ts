import { Injectable } from '@nestjs/common';
import { CreateRoomBookingDto } from '../dto/request/room-booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { RoomBook } from 'src/entities/room-book.entity';
import { RoomManage } from 'src/entities/room-manage.entity';

@Injectable()
export class RoomBookingService {
  constructor(
    @InjectRepository(RoomBook)
    private roomBookRepository: Repository<RoomBook>,
    @InjectRepository(RoomManage)
    private roomManageRepository: Repository<RoomManage>,
  ) {}

  create = async (body: CreateRoomBookingDto) => {
    try {
      let bookRooms = [];
      let { selectedRoomIds, ...rest } = body;

      if (selectedRoomIds && selectedRoomIds.length > 0) {
        bookRooms = selectedRoomIds.map((id) => ({ ...new RoomManage(), id }));
      }

      rest.phoneNumber = rest.phoneNumber.slice(-11);
      const data = { ...rest, bookRooms };

      await this.roomBookRepository.save(data);

      return {
        success: true,
        message: 'Successfully Booked',
      };
    } catch (error) {
      return {
        success: true,
        message: error.message,
      };
    }
  };

  findAll = async () => {
    try {
      const allInfo: any = await this.roomBookRepository
        .createQueryBuilder('booking')
        .select([
          'booking.id',
          'booking.guestFullName',
          'booking.email',
          'booking.phoneNumber',
          'booking.totalRoom',
          'booking.totalPerson',
          'booking.checkInDate',
          'booking.checkOutDate',
          'booking.isCheckedIn',
          'booking.isCheckedOut',
          'booking.isBookingCanceled',
          'loggedUser.fullName',
          'loggedUser.email',
          'loggedUser.phone',
          'bookRooms.roomNumber',
          'bookRooms.roomInfo',
          'bookRooms.price',
        ])
        .leftJoin('booking.bookRooms', 'bookRooms')
        .leftJoin('booking.loggedUser', 'loggedUser')
        .where('booking.isBookingCanceled = :isBookingCanceled', {
          isBookingCanceled: false,
        })
        .orderBy('booking.id', 'ASC')
        .getMany();
      return {
        success: true,
        message: 'Successfully Fetched all Information',
        data: allInfo,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  };

  findByPhoneOrEmail = async (phoneOrEmail: string) => {
    try {
      const bookInfo: any = await this.roomBookRepository
        .createQueryBuilder('booking')
        .select([
          'booking.id',
          'booking.guestFullName',
          'booking.email',
          'booking.phoneNumber',
          'booking.totalRoom',
          'booking.totalPerson',
          'booking.checkInDate',
          'booking.checkOutDate',
          'booking.isCheckedIn',
          'booking.isCheckedOut',
        ])
        .leftJoin('booking.loggedUser', 'loggedUser')
        .where('booking.phoneNumber = :phone', { phone: phoneOrEmail })
        .orWhere('booking.email = :email', { email: phoneOrEmail })
        .andWhere('booking.isBookingCanceled = :cancelbook', {
          cancelbook: false,
        })
        .orderBy('booking.id', 'ASC')
        .getMany();
      return {
        success: true,
        message: 'Successfully Fetched single Information',
        data: bookInfo,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  };

  findById = async (id: number) => {
    try {
      const singleInfo: any = await this.roomBookRepository
        .createQueryBuilder('booking')
        .leftJoinAndSelect('booking.loggedUser', 'loggedUser')
        .where('booking.id = :id', { id })
        .getOne();
      return {
        success: true,
        message: 'Successfully Fetched single Information',
        data: singleInfo,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  };

  updateCheckIn = async (id: number) => {
    try {
      await this.roomBookRepository
        .createQueryBuilder()
        .update(RoomBook)
        .set({ isCheckedIn: true })
        .where('id = :id', { id })
        .execute();

      return {
        success: true,
        message: 'CheckIn Successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  };

  updateCheckOut = async (id: number) => {
    try {
      await this.roomBookRepository
        .createQueryBuilder()
        .update(RoomBook)
        .set({ isCheckedOut: true })
        .where('id = :id', { id })
        .execute();

      return {
        success: true,
        message: 'CheckOut Successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  };

  updateCancelBooking = async (id: number) => {
    try {
      await this.roomBookRepository
        .createQueryBuilder()
        .update(RoomBook)
        .set({ isBookingCanceled: true })
        .where('id = :id', { id })
        .execute();

      return {
        success: true,
        message: 'Booking Cancel Successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  };
}
