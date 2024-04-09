import { Module } from '@nestjs/common'
import { CreateTokenService } from './token/create-token.service'
import { CheckTokenService } from './token/check-token.service'
import { ValidTokenService } from './token/valid-token.service'
import { AuthModelModule } from '../models/auth.model.module'
import { AuthService } from './auth.service'

@Module({
  imports: [AuthModelModule],
  providers: [
    CreateTokenService,
    CheckTokenService,
    ValidTokenService,
    AuthService,
  ],
  exports: [
    CreateTokenService,
    CheckTokenService,
    ValidTokenService,
    AuthService,
  ],
})
export class AuthServiceModule {}
