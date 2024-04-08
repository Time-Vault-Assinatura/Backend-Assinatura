import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthServiceModule } from './service/service.auth.module'
import { JwtModule } from '@nestjs/jwt'

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
