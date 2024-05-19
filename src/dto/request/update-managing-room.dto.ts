import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateManagingRoomDto {
  @IsOptional()
  @IsNumber()
  roomNumber: number;

  @IsOptional()
  @IsString()
  roomInfo: string;

  @IsOptional()
  @IsNumber()
  price: number;
}
