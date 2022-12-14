import { CacheModule, Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-ioredis';
import { ManagerService } from './manager.service';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: () => {
        return {
          store: redisStore,
          host: 'localhost',
          port: 6379,
          ttl: 0,
        };
      },
    }),
    BullModule,
  ],
  providers: [ManagerService, Map],
  exports: [ManagerService],
})
export class ManagerModule {}
