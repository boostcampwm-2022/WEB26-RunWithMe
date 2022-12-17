import { Inject } from '@nestjs/common';
import Bull from 'bull';

export class QueueMapService {
  constructor(@Inject(Map) private map: Map<string, Bull.Queue>) {}

  set(key: string, value: Bull.Queue) {
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
