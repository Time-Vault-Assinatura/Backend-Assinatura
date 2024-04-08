import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class CheckTokenService {
  constructor(private readonly jwtService: JwtService) {}

  admin(token: string) {
    return this.jwtService.verify(token, {
      secret: process.env.ADMIN_SECRET_KEY,
    })
  }

  user(token: string) {
    const decodedToken = this.jwtService.decode(token)

    if (!decodedToken) {
      throw new Error('Invalid token')
    }

    let secretKey: string
    if (decodedToken.userType === 'admin') {
      secretKey = process.env.ADMIN_SECRET_KEY
    } else if (decodedToken.userType === 'user') {
      secretKey = process.env.USER_SECRET_KEY
    } else {
      throw new Error('Invalid user type')
    }

    return this.jwtService.verify(token, {
      secret: secretKey,
    })
  }
}
