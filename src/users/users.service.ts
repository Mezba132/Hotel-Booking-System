import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from '../dto/users.dto';
const bcrypt = require('bcryptjs');

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  getAllUsers = async () => {
    try {
      const users: any = await this.userRepository
        .createQueryBuilder('user')
        .select(['user.id', 'user.fullName', 'user.email'])
        .getMany();
      return {
        success: true,
        message: 'Successfully Fetched',
        data: users,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  };
}
