import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateManagingRoomDto {
  @IsNotEmpty({ message: 'Room number is required' })
  @IsNumber({}, { message: 'Room number must be a number' })
  roomNumber: number;

  @IsNotEmpty({ message: 'Room info is required' })
  @IsString({ message: 'Room info must be a string' })
  roomInfo: string;

  @IsNotEmpty({ message: 'Price is required' })
  @IsNumber({}, { message: 'Price must be a number' })
  price: number;
}
