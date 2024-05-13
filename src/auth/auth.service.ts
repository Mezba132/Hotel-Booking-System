import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { SignUpReqDto } from 'src/dto/request/sign-up.dto';
import { SignInResponse } from 'src/dto/response/sign-in.dto';
import { SignUpResponse } from 'src/dto/response/sign-up.dto';
const bcrypt = require('bcryptjs');

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private authRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  validateUser = async (
    emailOrPhone: string,
    password: string,
  ): Promise<{
    success: boolean;
    message: string;
    info?: { email: string; phone: string; fullName: string; age: number };
  }> => {
    try {
      const verifiedUser = await this.authRepository
        .createQueryBuilder('user')
        .select(['user.fullName', 'user.email', 'user.password'])
        .where('email = :email', { email: emailOrPhone })
        .orWhere('phone = :phone', { phone: emailOrPhone })
        .getOne();

      if (verifiedUser) {
        const passwordCheck = bcrypt.compareSync(
          password,
          verifiedUser.password,
        );
        if (passwordCheck) {
          const { id, password, isActive, createdAt, updatedAt, ...result } =
            verifiedUser;
          return {
            success: true,
            message: '!! Email and Password matched !!',
            info: result,
          };
        } else {
          return {
            success: false,
            message: '!! Email and Password do not match !!',
          };
        }
      } else {
        return {
          success: false,
          message: 'Email and Password do not match!!!',
        };
      }
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  };

  signUp = async (body: SignUpReqDto): Promise<SignUpResponse> => {
    let salt = bcrypt.genSaltSync(10);
    body.password = bcrypt.hashSync(body.password, salt);

    try {
      let emailOrPhoneCheck = await this.authRepository
        .createQueryBuilder('user')
        .select(['user.fullName', 'user.email'])
        .where('email = :email', {
          email: body.email,
        })
        .orWhere('phone = :phone', { phone: body.phone })
        .getOne();

      if (emailOrPhoneCheck) {
        return {
          success: false,
          message: `User "${emailOrPhoneCheck.fullName}" Already exists`,
        };
      }

      await this.authRepository
        .createQueryBuilder()
        .insert()
        .values(body)
        .into(User)
        .execute();

      return {
        success: true,
        message: 'Successfully registered a new user',
        data: {
          fullName: body.fullName,
          email: body.email,
          phone: body.phone,
          age: body.age,
        },
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  };

  signIn = async (body: {
    success: boolean;
    message: string;
    data?: { email: string; phone: string; fullName: string; age: number };
  }): Promise<{
    success: boolean;
    message: string;
    data?: SignInResponse;
  }> => {
    try {
      return {
        success: true,
        message: 'success',
        data: {
          accessToken: this.jwtService.sign(body.data),
          data: body.data,
        },
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  };

  verifyJwt = async (jwt: string) => {
    try {
      return await this.jwtService.verify(jwt);
    } catch (error) {
      return {
        success: false,
        message: 'JWT verification failed',
      };
    }
  };
}
