import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({
    origin: process.env.CORS_ORIGIN, // Utiliza a variável de ambiente para definir a origem
    credentials: true, // Permite o envio de credenciais (como cookies) entre domínios
  })
  await app.listen(3000)
}

bootstrap()
