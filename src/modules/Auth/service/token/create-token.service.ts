import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

export type tTime = '2h' | '30m' | '1d' | '2d' | '7d'

@Injectable()
export class CreateTokenService {
  constructor(private readonly jwtService: JwtService) {}

  execute(
    uuid: string,
    time: tTime,
    userType: 'user' | 'admin',
  ): { accessToken: string } {
    const secretKey =
      userType === 'admin'
        ? process.env.ADMIN_SECRET_KEY
        : process.env.USER_SECRET_KEY
    return {
      accessToken: this.jwtService.sign(
        {
          uuid,
          userType,
        },
        {
          expiresIn: time,
          secret: secretKey,
        },
      ),
    }
  }
}
