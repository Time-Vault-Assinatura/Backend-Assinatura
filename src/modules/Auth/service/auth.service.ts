import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateTokenService } from './token/create-token.service'
import { AuthReadModel } from '../models/auth.read'
import { ResendService } from 'nestjs-resend'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private readonly createTokenService: CreateTokenService,
    private readonly authReadModel: AuthReadModel,
    private readonly resendService: ResendService,
  ) {}

  async login({ email, password }) {
    const user = await this.authReadModel.findUserByEmail(email)

    const resultPassword: boolean = await bcrypt.compare(
      password,
      user.password,
    )

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Email ou senha incorretos',
        },
        HttpStatus.NOT_FOUND,
      )
    }

    if (!user.isValid) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Acesso negado 🥶',
        },
        HttpStatus.BAD_REQUEST,
      )
    }

    if (!resultPassword) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Email ou senha incorretos',
        },
        HttpStatus.BAD_REQUEST,
      )
    }

    try {
      if (user.role === 'USER') {
        const token = this.createTokenService.execute(user.id, '2h', 'user')

        return {
          user,
          token,
        }
      }

      const token = this.createTokenService.execute(user.id, '2h', 'admin')

      return {
        user,
        token,
      }
    } catch (error) {
      throw new HttpException(
        {
          status: error.status,
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  async resetPassword({ email }) {
    await this.resendService.send({
      from: 'abner.barbosa@sou.inteli.edu.br',
      to: email,
      subject: 'hello world',
      html: '<strong>it works!</strong>',
    })
  }
}
