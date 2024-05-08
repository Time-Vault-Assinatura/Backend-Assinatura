import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { CheckTokenService } from '../modules/Auth/service/token/check-token.service'

@Injectable()
export class AuthGuardUser implements CanActivate {
  constructor(private readonly checkTokenService: CheckTokenService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()
    const { authorization } = request.headers

    try {
      const token = (authorization ?? '').split(' ')[1]
      const data = this.checkTokenService.user(token)

      console.log('Dados Decodificados:', data)

      // Verifica se o campo `uuid` está presente
      if (!data.uuid) {
        console.error('UUID não encontrado no token:', data)
        throw new UnauthorizedException('UUID não encontrado no token')
      }

      request.uuid = data.uuid
      return true
    } catch (error) {
      return false
    }
  }
}
