import { Injectable } from '@nestjs/common';
import { CreateManagingRoomDto } from '../dto/request/create-managing-room.dto';
import { UpdateManagingRoomDto } from '../dto/request/update-managing-room.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomManage } from 'src/entities/room-manage.entity';

@Injectable()
export class ManagingRoomsService {
  constructor(
    @InjectRepository(RoomManage)
    private roomRepository: Repository<RoomManage>,
  ) {}
  create = async (body: CreateManagingRoomDto) => {
    try {
      await this.roomRepository
        .createQueryBuilder()
        .insert()
        .values(body)
        .into(RoomManage)
        .execute();

      return {
        success: true,
        message: 'Successfully Inserted Room Information',
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
      const allRoom: any = await this.roomRepository
        .createQueryBuilder('room')
        .select(['room.id', 'room.roomNumber', 'room.roomInfo', 'room.price'])
        .getMany();
      return {
        success: true,
        message: 'Successfully Fetched all room',
        data: allRoom,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  };

  findOne = async (id: number) => {
    try {
      const sigleRoom: any = await this.roomRepository
        .createQueryBuilder('room')
        .select(['room.id', 'room.roomNumber', 'room.roomInfo', 'room.price'])
        .where('id = :id', { id })
        .getOne();

      return {
        success: true,
        message: 'Successfully Fetched',
        data: sigleRoom,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  };

  update = async (id: number, body: UpdateManagingRoomDto) => {
    try {
      await this.roomRepository
        .createQueryBuilder()
        .update(RoomManage)
        .set(body)
        .where('id = :id', { id })
        .execute();

      return {
        success: true,
        message: 'Successfully Updated',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  };

  remove = async (id: number) => {
    try {
      let deleteRoom = await this.roomRepository
        .createQueryBuilder()
        .delete()
        .from(RoomManage)
        .where('id = :id', { id })
        .execute();

      if (deleteRoom.affected === 0) {
        return {
          success: true,
          message: 'Delete Failed',
        };
      }

      return {
        success: true,
        message: 'Deleted Successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  };
}
