import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateTokenService } from './token/create-token.service'
import { AuthReadModel } from '../models/auth.read'
import * as bcrypt from 'bcrypt'
import { MailerService } from '@nestjs-modules/mailer'
import { AuthCreateModel } from '../models/auth.create'
import ResetPasswordHTML from '../../../templates/reset-password'

@Injectable()
export class AuthService {
  constructor(
    private readonly createTokenService: CreateTokenService,
    private readonly authReadModel: AuthReadModel,
    private readonly mailer: MailerService,
    private readonly authCreateModel: AuthCreateModel,
  ) {}

  async login({ email, password }) {
    const user = await this.authReadModel.findUserByEmail(email)

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Email incorreto',
        },
        HttpStatus.NOT_FOUND,
      )
    }

    if (!user.password) {
      throw new Error('Usuário encontrado, mas sem senha registrada.')
    }

    if (!user.isValid) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Acesso negado',
        },
        HttpStatus.BAD_REQUEST,
      )
    }

    const resultPassword: boolean = await bcrypt.compare(
      password,
      user.password,
    )

    if (!resultPassword) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Senha incorreta',
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

    this.mailer.sendMail({
      to: user.email,
      subject: 'Recupere a sua senha da assinatura Vault',
      html: ResetPasswordHTML(token.accessToken, user.name, user.email),
    })
  }

  async createPassword(email: string, newPassword: string) {
    const user = await this.authReadModel.findUserByEmail(email)

    if (!user) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: 'Usuário não encontrado' },
        HttpStatus.NOT_FOUND,
      )
    }

    if (!user.isValid) {
      throw new HttpException(
        { status: HttpStatus.BAD_REQUEST, error: 'Usuário não está ativo' },
        HttpStatus.BAD_REQUEST,
      )
    }

    if (!user.isFirstAcess) {
      throw new HttpException(
        { status: HttpStatus.BAD_REQUEST, error: 'Usuário já definiu a senha' },
        HttpStatus.BAD_REQUEST,
      )
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)

    await this.authCreateModel.createPassword(email, hashedPassword, false)

    return { status: 'success', message: 'Senha criada com sucesso' }
  }
}
