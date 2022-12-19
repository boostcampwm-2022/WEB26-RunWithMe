import { Module } from '@nestjs/common';
import { QueueMapService } from './queue-map.service';

@Module({
  providers: [Map, QueueMapService],
  exports: [QueueMapService],
})
export class QueueMapModule {}
