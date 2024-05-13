import {
  IsNotEmpty,
  IsNumber,
  IsDateString,
  IsOptional,
  IsString,
} from 'class-validator';

export class UserDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsOptional()
  @IsDateString()
  dob: Date;
}
