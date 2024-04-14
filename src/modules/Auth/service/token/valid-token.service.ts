import { Injectable } from '@nestjs/common'
import { CheckTokenService } from './check-token.service'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class ValidTokenService {
  constructor(
    private readonly checkTokenService: CheckTokenService,
    private readonly jwtService: JwtService,
  ) {}

  admin(token: string) {
    try {
      this.checkTokenService.admin(token)
      return true
    } catch (error) {
      return false
    }
  }

  user(token: string) {
    try {
      this.checkTokenService.user(token)
      return true
    } catch (error) {
      return false
    }
  }

  validateResetPasswordToken(token: string, userId: string): boolean {
    try {
      const decodedToken = this.jwtService.decode(token)

      if (!decodedToken) {
        throw new Error('Invalid token')
      }

      const secretKey =
        decodedToken.userType === 'admin'
          ? process.env.ADMIN_SECRET_KEY
          : process.env.USER_SECRET_KEY
      const verifiedToken = this.jwtService.verify(token, { secret: secretKey })

      return verifiedToken.uuid === userId
    } catch (error) {
      return false
    }
  }
}
