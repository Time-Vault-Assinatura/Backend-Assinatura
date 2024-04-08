import { Injectable } from '@nestjs/common'
import { CheckTokenService } from './check-token.service'

@Injectable()
export class ValidTokenService {
  constructor(private readonly checkTokenService: CheckTokenService) {}

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
}
