import { Module } from '@nestjs/common';
import { DelayedConsumer } from './app.consumer';
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
    BullModule.registerQueue({ name: 'delayed' }),
  ],
  providers: [DelayedConsumer],
})
export class AppModule {}
