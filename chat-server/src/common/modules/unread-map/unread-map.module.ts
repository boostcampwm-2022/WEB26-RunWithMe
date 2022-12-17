import { Module } from '@nestjs/common';
import { UnReadMapService } from './unread-map.service';

@Module({
  providers: [Map, UnReadMapService],
  exports: [UnReadMapService],
})
export class UnReadMapModule {}
