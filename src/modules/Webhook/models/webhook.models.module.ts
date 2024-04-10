import { PrismaModule } from 'src/config/prisma/prisma.module'
import { WebhookCreateModel } from './webhook.create'
import { Module } from '@nestjs/common'

@Module({
  imports: [PrismaModule],
  providers: [WebhookCreateModel],
  exports: [WebhookCreateModel],
})
export class webhookModelModule {}
