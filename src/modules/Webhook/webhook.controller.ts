import { Controller, Post, Body, HttpCode } from '@nestjs/common'
import { WebhookService } from './services/webhook.service'
import { WebhookEvent } from './DTO/webhook.dto'

@Controller('webhook')
export class WebhookController {
  constructor(private webhookService: WebhookService) {}

  @Post()
  @HttpCode(200)
  async receiveWebhook(@Body() event: WebhookEvent) {
    await this.webhookService.handleWebhook(event)
    return { success: true }
  }
}
