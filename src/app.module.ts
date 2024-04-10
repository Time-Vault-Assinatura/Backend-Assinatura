import { Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'
import { AdminModule } from './modules/Admin/admin.module'
import { ClientModule } from './modules/Client/client.module'
import { AuthModule } from './modules/Auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { MailerModule } from '@nestjs-modules/mailer'
import { WebhookModule } from './modules/Webhook/webhook.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    AdminModule,
    ClientModule,
    WebhookModule,
    AuthModule,
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        secure: true,
        tls: {
          ciphers: 'SSLv3',
        },
        requireTLS: true,
        port: 465,
        debug: true,
        auth: {
          user: process.env.USER_EMAIL_MAILER,
          pass: process.env.USER_PASSWORD_MAILER,
        },
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
