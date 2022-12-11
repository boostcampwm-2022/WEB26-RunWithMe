import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';

import { DelayedConsumer } from './app.delayed.consumer';
import { ImmediateConsumer } from './app.immediate.consumer';
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
    BullModule.registerQueue({ name: 'delayed' }, { name: 'immediate' }),
    CacheModule.register(),
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService, DelayedConsumer, ImmediateConsumer],
})
export class AppModule {}
