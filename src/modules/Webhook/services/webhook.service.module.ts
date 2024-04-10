import { Module } from '@nestjs/common'
import { webhookModelModule } from '../models/webhook.models.module'
import { WebhookService } from './webhook.service'

@Module({
  imports: [webhookModelModule],
  providers: [WebhookService],
  exports: [WebhookService],
})
export class webhookServiceModule {}
