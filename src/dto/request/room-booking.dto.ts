import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Min,
} from 'class-validator';
import { User } from 'src/entities/user.entity';

export class CreateRoomBookingDto {
  @IsNotEmpty({ message: 'Guest full name is required' })
  @IsString({ message: 'Guest full name must be a string' })
  guestFullName: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsString({ message: 'Email must be a string' })
  @Matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: 'Invalid email format' })
  email: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1, { message: 'Select atleast 1 room' })
  totalRoom: number;

  @IsNotEmpty()
  @IsString()
  @Matches(/^(?:\+88|88)?(01[1-9]\d{8})$/, {
    message: 'Invalid phone number format',
  })
  phoneNumber: string;

  @IsOptional()
  @Type(() => User)
  loggedUser: User;

  @IsNotEmpty({ message: 'Selected room IDs are required' })
  @IsArray({ message: 'Selected room IDs must be an array of numbers' })
  @IsNumber({}, { each: true, message: 'Each room ID must be a number' })
  selectedRoomIds: number[];

  @IsNotEmpty({ message: 'Total person is required' })
  @IsNumber({}, { message: 'Total person must be a number' })
  totalPerson: number;

  @IsNotEmpty({ message: 'Check-in date is required' })
  @IsDate({ message: 'Check-in date must be a valid date' })
  @Type(() => Date)
  checkInDate: Date;

  @IsNotEmpty({ message: 'Check-out date is required' })
  @IsDate({ message: 'Check-out date must be a valid date' })
  @Type(() => Date)
  checkOutDate: Date;
}
