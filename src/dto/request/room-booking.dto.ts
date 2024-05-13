import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class CreateRoomBookingDto {
  @IsNotEmpty()
  @IsString()
  guestFullName: string;

  @IsOptional()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsNumber()
  totalRoom: number;

  @IsNotEmpty()
  @IsString()
  @Matches(/^(?:\+88|88)?(01[1-9]\d{8})$/, {
    message: 'Invalid phone number format',
  })
  phoneNumber: string;

  @IsOptional()
  @IsNumber()
  loggedUser: number;

  @IsNotEmpty()
  @IsNumber()
  totalPerson: number;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  checkInDate: Date;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  checkOutDate: Date;
}
