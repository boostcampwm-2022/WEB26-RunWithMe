import { NestFactory } from '@nestjs/core';
import { SocketModule } from './socket.module';

async function bootstrap() {
  const app = await NestFactory.create(SocketModule);
  app.enableCors({ origin: '*', credentials: true });
  await app.listen(8080);
}
bootstrap();
