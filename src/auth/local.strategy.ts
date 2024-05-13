import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'emailOrPhone',
    });
  }

  async validate(
    emailOrPhone: string,
    password: string,
  ): Promise<{
    success: boolean;
    message: string;
    data?: { email: string; phone: string; fullName: string; age: number };
  }> {
    let result = await this.authService.validateUser(emailOrPhone, password);

    return {
      success: result.success,
      message: result.message,
      data: result.info,
    };
  }
}
