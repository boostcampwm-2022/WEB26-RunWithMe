import { Module } from '@nestjs/common';
import { ImmediateConsumer } from './app.consumer';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
      },
    }),
    MailModule,
    BullModule.registerQueue({ name: 'immediate' }),
  ],
  providers: [ImmediateConsumer],
})
export class AppModule {}
