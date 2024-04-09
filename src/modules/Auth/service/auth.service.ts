import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateTokenService } from './token/create-token.service'
import { AuthReadModel } from '../models/auth.read'
import { ResendService } from 'nestjs-resend'
import * as bcrypt from 'bcrypt'
import { MailerService } from '@nestjs-modules/mailer'

@Injectable()
export class AuthService {
  constructor(
    private readonly createTokenService: CreateTokenService,
    private readonly authReadModel: AuthReadModel,
    private readonly mailer: MailerService,
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
    const user = await this.authReadModel.findUserByEmail(email)
    let token: { accessToken: string }

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Usuário não encontrado',
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

    switch (user.role) {
      case 'USER':
        token = this.createTokenService.execute(user.id, '30m', 'user')
        break

      case 'ADMIN':
        token = this.createTokenService.execute(user.id, '30m', 'admin')
        break
    }

    // this.resendService.send({
    //   from: 'abnerdruns@gmail.com',
    //   to: user.email,
    //   subject: 'hello world',
    //   html: `<strong>it works! token: ${token.accessToken}</strong>`,
    // })

    this.mailer.sendMail({
      to: user.email,
      subject: 'Hora de recuperar a sua senha',
      html: `<strong>it works! token: ${token.accessToken}</strong>`,
    })
  }
}
