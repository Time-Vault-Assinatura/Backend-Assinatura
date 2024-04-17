import { Injectable } from '@nestjs/common'
import { WebhookEvent } from '../DTO/webhook.dto'
import { WebhookCreateModel } from '../models/webhook.create'
import { MailerService } from '@nestjs-modules/mailer'
import createPassword from '../../../templates/create-password'

@Injectable()
export class WebhookService {
  constructor(
    private readonly webhookCreateModel: WebhookCreateModel,
    private readonly mailer: MailerService,
  ) {}

  async handleWebhook(event: WebhookEvent) {
    const { firstName, lastName, email } = event.event.user
    const status = event.event.subscription.status

    await this.webhookCreateModel.userCreate(firstName, lastName, email, status)

    this.mailer.sendMail({
      to: email,
      subject: 'Crie a sua senha para acessar a plataforma da Vault',
      html: createPassword(firstName, email),
    })
  }
}
