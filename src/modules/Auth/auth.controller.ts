import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  Post,
  UseGuards,
} from '@nestjs/common'
import { ValidTokenService } from './service/token/valid-token.service'
import { CreateTokenService } from './service/token/create-token.service'
import { AuthGuardAdmin } from '../../guards/auth-admin.guard'
import { AuthGuardUser } from '../../guards/auth-user.guard'
import { AuthService } from './service/auth.service'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly validTokenService: ValidTokenService,
    private readonly createTokenService: CreateTokenService,
    private readonly authService: AuthService,
  ) {}

  // TODO: fazer DTO para o login
  @Post('login')
  @HttpCode(200)
  async login(@Body() body: { email: string; password: string }) {
    body.email = body.email.toLowerCase()
    return await this.authService.login(body)
  }

  @Post('reset-password')
  async resetPassword(@Body() body: { email: string }) {
    return await this.authService.resetPassword(body)
  }

  @UseGuards(AuthGuardAdmin)
  @Post('check-token')
  @HttpCode(200)
  async checkTokenAdmin(@Body() body: { token: string }) {
    if (this.validTokenService.admin(body.token) !== true)
      throw new HttpException(
        {
          status: 401,
          error: 'Token invalido',
        },
        401,
      )

    return this.validTokenService.admin(body.token)
  }

  @UseGuards(AuthGuardUser)
  @Post('check-token')
  @HttpCode(200)
  async checkTokenUser(@Body() body: { token: string }) {
    if (this.validTokenService.user(body.token) !== true)
      throw new HttpException(
        {
          status: 401,
          error: 'Token invalido',
        },
        401,
      )

    return this.validTokenService.user(body.token)
  }

  @Post('create-password')
  async createPassword(@Body() body: { email: string; newPassword: string }) {
    return await this.authService.createPassword(body.email, body.newPassword)
  }
}
