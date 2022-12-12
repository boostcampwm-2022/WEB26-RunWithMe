import { CacheModule, CACHE_MANAGER, Module } from '@nestjs/common';
import { memoryStore } from 'cache-manager';
import * as redisStore from 'cache-manager-ioredis';
import type { ClientOpts } from 'redis';
import { ManagerService } from './manager.service';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    CacheModule.register<ClientOpts>([
      // q저장 store
      {
        store: redisStore,
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        ttl: 0,
      },
      {
        store: memoryStore,
        ttl: 0,
      },
    ]),
    BullModule,
  ],
  providers: [
    {
      provide: 'redisCache',
      useExisting: CACHE_MANAGER,
    },
    {
      provide: 'memoryCache',
      useExisting: CACHE_MANAGER,
    },
    ManagerService,
  ],
  exports: [ManagerService],
})
export class ManagerModule {}
