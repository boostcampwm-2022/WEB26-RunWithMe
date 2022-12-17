import { Inject } from '@nestjs/common';

export class UnReadMapService {
  constructor(@Inject(Map) private map: Map<string, number>) {}

  set(key: string, value: number) {
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
