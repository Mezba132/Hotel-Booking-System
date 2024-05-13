import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class SignUpReqDto {
  @IsOptional()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;

  @IsNotEmpty()
  @IsString()
  @Matches(/^(?:\+88|88)?(01[1-9]\d{8})$/, {
    message: 'Invalid phone number format',
  })
  phone: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
