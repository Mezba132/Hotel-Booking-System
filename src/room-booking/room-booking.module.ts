import { Module } from '@nestjs/common';
import { RoomBookingService } from './room-booking.service';
import { RoomBookingController } from './room-booking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomBook } from 'src/entities/room-book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoomBook])],
  controllers: [RoomBookingController],
  providers: [RoomBookingService],
})
export class RoomBookingModule {}
