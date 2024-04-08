import { Module } from '@nestjs/common'
import { CreateTokenService } from './token/create-token.service'
import { CheckTokenService } from './token/check-token.service'
import { ValidTokenService } from './token/valid-token.service'

@Module({
  imports: [],
  providers: [CreateTokenService, CheckTokenService, ValidTokenService],
  exports: [CreateTokenService, CheckTokenService, ValidTokenService],
})
export class AuthServiceModule {}
