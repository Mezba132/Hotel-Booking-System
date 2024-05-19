import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RoomBookingService } from './room-booking.service';
import { CreateRoomBookingDto } from '../dto/request/room-booking.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('room-booking')
@ApiTags('Hotel Booking System')
export class RoomBookingController {
  constructor(private readonly roomBookingService: RoomBookingService) {}

  @Post('book/new')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Book new rooms',
  })
  @ApiResponse({
    description: 'Room booking successfully done',
    status: 201,
  })
  @ApiBadRequestResponse({ description: 'Invalid request body' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        guestFullName: { type: 'string', example: 'John Doe' },
        email: { type: 'string', example: 'johndoe@example.com' },
        phoneNumber: { type: 'string', example: '01234567890' },
        selectedRoomIds: { type: 'array', example: [1, 2] },
        loggedUser: { type: 'number', example: 1 },
        totalRoom: { type: 'number', example: 2 },
        totalPerson: { type: 'number', example: 2 },
        checkInDate: { type: 'date', example: '2024-05-10' },
        checkOutDate: { type: 'date', example: '2024-05-19' },
      },
    },
  })
  async create(@Body() createRoomBookingDto: CreateRoomBookingDto) {
    return await this.roomBookingService.create(createRoomBookingDto);
  }

  @Get('get-all')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'List Of All Bookings.',
  })
  @ApiResponse({
    description: 'Successfully fetched all bookings',
    status: 201,
  })
  async findAll() {
    return await this.roomBookingService.findAll();
  }

  @Get(':phone')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get Bookings By Phone.',
  })
  @ApiResponse({
    description: 'Successfully fetched bookings',
    status: 201,
  })
  findByPhoneOrEmail(@Param('phoneOrEmail') phoneOrEmail: string) {
    return this.roomBookingService.findByPhoneOrEmail(phoneOrEmail);
  }

  @Get('findbyId/:id')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get Booking By Id.',
  })
  @ApiResponse({
    description: 'Successfully fetched single booking',
    status: 201,
  })
  findById(@Param('id') id: number) {
    return this.roomBookingService.findById(id);
  }

  @Patch('checkIn/:id')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Set CheckIn',
  })
  @ApiResponse({
    description: 'Successfully Checked In',
    status: 201,
  })
  updateCheckIn(@Param('id') id: string) {
    return this.roomBookingService.updateCheckIn(+id);
  }

  @Patch('checkOut/:id')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Set CheckOut',
  })
  @ApiResponse({
    description: 'Successfully Checked Out',
    status: 201,
  })
  updateCheckOut(@Param('id') id: string) {
    return this.roomBookingService.updateCheckOut(+id);
  }

  @Patch('cancelBooking/:id')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Set Booking Cancelation',
  })
  @ApiResponse({
    description: 'Successfully cancel booking',
    status: 201,
  })
  updateCancelBooking(@Param('id') id: string) {
    return this.roomBookingService.updateCancelBooking(+id);
  }
}
