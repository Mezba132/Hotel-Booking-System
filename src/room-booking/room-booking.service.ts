import { Injectable } from '@nestjs/common';
import { CreateRoomBookingDto } from '../dto/request/room-booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomBooking } from 'src/entities/booking.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoomBookingService {
  constructor(
    @InjectRepository(RoomBooking)
    private bookingRepository: Repository<RoomBooking>,
  ) {}

  create = async (body: CreateRoomBookingDto) => {
    try {
      await this.bookingRepository
        .createQueryBuilder()
        .insert()
        .values(body)
        .into(RoomBooking)
        .execute();
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
      const allInfo: any = await this.bookingRepository
        .createQueryBuilder('booking')
        .leftJoinAndSelect('booking.loggedUser', 'loggedUser')
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

  findOne = async (phone: string) => {
    try {
      const singleInfo: any = await this.bookingRepository
        .createQueryBuilder('booking')
        .leftJoinAndSelect('booking.loggedUser', 'loggedUser')
        .where('booking.phoneNumber = :phone', { phone: phone })
        .getMany();
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

  findById = async (id: number) => {
    try {
      const singleInfo: any = await this.bookingRepository
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
      await this.bookingRepository
        .createQueryBuilder()
        .update(RoomBooking)
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
      await this.bookingRepository
        .createQueryBuilder()
        .update(RoomBooking)
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
      await this.bookingRepository
        .createQueryBuilder()
        .update(RoomBooking)
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
