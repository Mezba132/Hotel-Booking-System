import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { SignUpReqDto } from 'src/dto/request/sign-up.dto';
import { isEmpty } from 'class-validator';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Authentication and Authorization')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register/new')
  @ApiOperation({
    summary: 'Create a new user',
  })
  @ApiResponse({
    description: 'Successfully created a new user',
    status: 201,
  })
  @ApiBadRequestResponse({ description: 'Invalid request body' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        fullName: { type: 'string', example: 'John Doe' },
        email: { type: 'string', example: 'johndoe@mail.com' },
        age: { type: 'number', example: 30 },
        gender: { type: 'string', example: 'male' },
        phone: { type: 'string', example: '01234567890' },
        password: { type: 'string', example: 'Pass##123' },
      },
    },
  })
  async registerNewUser(@Body() body: SignUpReqDto) {
    return await this.authService.signUp(body);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({
    summary: 'User Login',
  })
  @ApiResponse({
    description: 'Login Successfully',
    status: 201,
  })
  @ApiBadRequestResponse({ description: 'Invalid request body' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        emailOrPhone: { type: 'string', example: 'johndoe@mail.com' },
        password: { type: 'string', example: 'Pass##123' },
      },
    },
  })
  async login(@Request() req) {
    if (req.user.success === true && !isEmpty(req.user.data)) {
      return await this.authService.signIn(req.user);
    } else {
      return {
        success: req.user.success,
        message: req.user.message,
      };
    }
  }
}
