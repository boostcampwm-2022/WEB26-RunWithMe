import { Inject } from '@nestjs/common';
import { Socket } from 'socket.io';

export class SocketMapService {
  constructor(@Inject(Map) private map: Map<string, Socket>) {}

  set(key: string, value: Socket) {
    this.map.set(key, value);
  }

  get(key: string) {
    return this.map.get(key);
  }

  delete(key: string) {
    this.map.delete(key);
  }

  keys() {
    return this.map.keys();
  }
}
