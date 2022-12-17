import { Module } from '@nestjs/common';
import { SocketMapService } from './socket-map.service';

@Module({
  providers: [Map, SocketMapService],
  exports: [SocketMapService],
})
export class SocketMapModule {}
