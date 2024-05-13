import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserDto } from '../dto/users.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('User Info')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('all')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Fetch all users',
  })
  @ApiResponse({
    description: 'Successfully get all users',
    status: 201,
  })
  getAllUsers() {
    return this.usersService.getAllUsers();
  }
}
