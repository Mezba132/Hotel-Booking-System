import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
class Info {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;
}

export class SignInResponse {
  @IsString()
  accessToken: string;

  @IsOptional()
  @Type(() => Info)
  data?: Info;
}
