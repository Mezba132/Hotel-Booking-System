import { Module } from '@nestjs/common';
import { RoomBookingService } from './room-booking.service';
import { RoomBookingController } from './room-booking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomBook } from 'src/entities/room-book.entity';
import { RoomManage } from 'src/entities/room-manage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoomBook, RoomManage])],
  controllers: [RoomBookingController],
  providers: [RoomBookingService],
})
export class RoomBookingModule {}
