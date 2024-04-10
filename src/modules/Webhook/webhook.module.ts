import { WebhookController } from './webhook.controller'
import { TokenMiddleware } from '../../guards/auth-webhook.guard'
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common'
import { webhookServiceModule } from './services/webhook.service.module'

@Module({
  imports: [webhookServiceModule],
  controllers: [WebhookController],
})
export class WebhookModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TokenMiddleware)
      .forRoutes({ path: 'webhook', method: RequestMethod.POST })
  }
}
