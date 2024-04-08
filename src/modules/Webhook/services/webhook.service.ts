import { Injectable } from '@nestjs/common'
import { WebhookEvent } from '../DTO/webhook.dto'
import { WebhookCreateModel } from '../models/webhook.create'

@Injectable()
export class WebhookService {
  constructor(private webhookCreateModel: WebhookCreateModel) {}

  async handleWebhook(event: WebhookEvent) {
    const { firstName, lastName, email } = event.event.user
    const status = event.event.subscription.status

    await this.webhookCreateModel.userCreate(firstName, lastName, email, status)
  }
}
