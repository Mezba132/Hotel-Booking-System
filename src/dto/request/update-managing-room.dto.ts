import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateManagingRoomDto {
  @IsOptional()
  @IsNumber({}, { message: 'Room number must be a number' })
  roomNumber: number;

  @IsOptional()
  @IsString({ message: 'Room info must be a string' })
  roomInfo: string;

  @IsOptional()
  @IsNumber({}, { message: 'Price must be a number' })
  price: number;
}
