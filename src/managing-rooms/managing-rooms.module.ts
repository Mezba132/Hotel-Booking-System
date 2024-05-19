import { Module } from '@nestjs/common';
import { ManagingRoomsService } from './managing-rooms.service';
import { ManagingRoomsController } from './managing-rooms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomManage } from 'src/entities/room-manage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoomManage])],
  controllers: [ManagingRoomsController],
  providers: [ManagingRoomsService],
})
export class ManagingRoomsModule {}
