import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

@Injectable()
export class TokenMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['x-webhook-token']

    if (token !== process.env.WEBHOOK_HUBLA_TOKEN) {
      return res.status(403).send({ error: 'Token inválido' })
    }

    next()
  }
}
