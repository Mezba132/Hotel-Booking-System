import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ManagingRoomsService } from './managing-rooms.service';
import { CreateManagingRoomDto } from '../dto/request/create-managing-room.dto';
import { UpdateManagingRoomDto } from '../dto/request/update-managing-room.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('room')
@ApiTags('Managing Rooms')
export class ManagingRoomsController {
  constructor(private readonly managingRoomsService: ManagingRoomsService) {}

  @Post('create/new')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create a new room',
  })
  @ApiResponse({
    description: 'Room Creation successfully done',
    status: 201,
  })
  @ApiBadRequestResponse({ description: 'Invalid request body' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        roomNumber: { type: 'number', example: 101 },
        roomInfo: { type: 'string', example: 'Single Bed with AC' },
        price: { type: 'number', example: 5000 },
      },
    },
  })
  async create(@Body() createManagingRoomDto: CreateManagingRoomDto) {
    return await this.managingRoomsService.create(createManagingRoomDto);
  }

  @Get('get-all')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Fetch All room information',
  })
  @ApiResponse({
    description: 'Successfully Fetch all room information',
    status: 201,
  })
  async findAll() {
    return await this.managingRoomsService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Fetch single room information',
  })
  @ApiResponse({
    description: 'Successfully fetch single room information',
    status: 201,
  })
  findOne(@Param('id') id: string) {
    return this.managingRoomsService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update single room information',
  })
  @ApiResponse({
    description: 'Successfully update Single room information',
    status: 201,
  })
  update(
    @Param('id') id: string,
    @Body() updateManagingRoomDto: UpdateManagingRoomDto,
  ) {
    return this.managingRoomsService.update(+id, updateManagingRoomDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'delete single room information',
  })
  @ApiResponse({
    description: 'Successfully delete Single room information',
    status: 200,
  })
  remove(@Param('id') id: string) {
    return this.managingRoomsService.remove(+id);
  }
}
