import { CacheModule, Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-ioredis';
import { ManagerService } from './manager.service';
import { BullModule } from '@nestjs/bull';
import { QueueMapModule } from 'src/common/modules/queue-map/queue-map.module';
import { SocketMapModule } from 'src/common/modules/socket-map/socket-map.module';
import { UnReadMapModule } from 'src/common/modules/unread-map/unread-map.module';

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
    QueueMapModule,
    SocketMapModule,
    UnReadMapModule,
  ],
  providers: [ManagerService],
  exports: [ManagerService],
})
export class ManagerModule {}
