import { WebhookController } from './webhook.controller'
import { WebhookService } from './services/webhook.service'
import { PrismaService } from '../../config/prisma/prisma.service' // Assumindo que você tem um PrismaService
import { TokenMiddleware } from '../../guards/auth-webhook.guard'
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common'

@Module({
  controllers: [WebhookController],
  providers: [WebhookService, PrismaService],
})
export class WebhookModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TokenMiddleware)
      .forRoutes({ path: 'webhook', method: RequestMethod.POST })
  }
}
