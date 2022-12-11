import { CacheModule, Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-ioredis';
import type { ClientOpts } from 'redis';
import { ManagerService } from './manager.service';

@Module({
  imports: [
    CacheModule.register<ClientOpts>({
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      ttl: 0,
    }),
  ],
  providers: [ManagerService],
  exports: [ManagerService],
})
export class ManagerModule {}
