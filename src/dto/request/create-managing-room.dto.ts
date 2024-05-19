import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateManagingRoomDto {
  @IsNotEmpty()
  @IsNumber()
  roomNumber: number;

  @IsNotEmpty()
  @IsString()
  roomInfo: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
