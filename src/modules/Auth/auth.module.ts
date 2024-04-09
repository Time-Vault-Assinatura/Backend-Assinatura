import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { AuthController } from './auth.controller'
import { AuthServiceModule } from './service/service.auth.module'

@Module({
  imports: [
    AuthServiceModule,
    JwtModule.register({
      global: true,
    }),
  ],
  controllers: [AuthController],
  exports: [AuthServiceModule],
})
export class AuthModule {}
