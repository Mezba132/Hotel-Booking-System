import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiBearerAuth,
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
