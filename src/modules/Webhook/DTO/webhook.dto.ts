export class WebhookEvent {
  type: string
  event: {
    product: {
      id: string
      name: string
    }
    subscription: {
      status: 'active' | 'inactive'
      // Inclua outros campos necessários aqui
    }
    user: {
      firstName: string
      lastName: string
      email: string
      // Inclua outros campos necessários aqui
    }
  }

  version: string
}
