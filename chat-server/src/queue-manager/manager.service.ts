import { CACHE_MANAGER, Inject, Injectable, Scope } from '@nestjs/common';
import { Cache } from 'cache-manager';
import * as Bull from 'bull';
import { Socket } from 'socket.io';
import { QueueMapService } from 'src/common/modules/queue-map/queue-map.service';
import { SocketMapService } from 'src/common/modules/socket-map/socket-map.service';
import { UnReadMapService } from 'src/common/modules/unread-map/unread-map.service';

@Injectable({ scope: Scope.DEFAULT })
export class ManagerService {
  constructor(
    @Inject(CACHE_MANAGER) private redisCache: Cache,
    private queueMap: QueueMapService,
    private socketMap: SocketMapService,
    private unReadCountMap: UnReadMapService,
  ) {}

  async generateQueue(name: string) {
    const queue = new Bull(name);
    queue.pause();
    this.queueMap.set(name, queue);
    return queue;
  }

  async deleteOneQueue(name: string) {
    const deleteWork = [];
    const keyArr = await this.redisCache.store.keys(`bull:${name}:*`);
    keyArr.map((key: string) => {
      deleteWork.push(this.redisCache.del(key));
    }); // bull.js Queue 지우는용
    this.queueMap.delete(name); // 매핑된 인스턴스 지우는용
    return Promise.all(deleteWork);
  }

  async deleteManyQueue(recruitId: string) {
    const deleteWork = [];
    const keyArr = await this.redisCache.store.keys(`bull:${recruitId}:*`);
    keyArr.map((key: string) => {
      deleteWork.push(this.redisCache.del(key));
    }); // bull.js Queue 지우는용
    const keys = Array.from(this.queueMap.keys()).filter(
      (key) => key.split(':')[0] === recruitId,
    );
    keys.map((key: string) => this.queueMap.delete(key)); // 매핑된 모든 인스턴스 지우는용
  }

  // 서버 메모리에서, name(key) 값으로 Queue Instance 가져와서 반환해주기
  getQueue(name: string): Bull.Queue {
    return this.queueMap.get(name);
  }

  getQueueList(recruitId: string) {
    const keys = Array.from(this.queueMap.keys()).filter(
      (key) => key.split(':')[0] === recruitId,
    );
    return keys.map((key) => this.queueMap.get(key));
  }

  async getQueueSize(name: string) {
    const queue = this.queueMap.get(name);
    if (!queue) return 0;
    const { waiting } = await queue.getJobCounts();
    return waiting;
  }

  getSocket(name: string): Socket {
    return this.socketMap.get(name);
  }

  setSocket(userId: string, socket: Socket): void {
    this.socketMap.set(userId, socket);
  }

  deleteSocket(userId: string): void {
    this.socketMap.delete(userId);
  }

  getUnReadCount(name: string): number {
    return this.unReadCountMap.get(name);
  }

  setUnReadCount(name: string, unReadCount: number): void {
    this.unReadCountMap.set(name, unReadCount);
  }

  deleteUnReadCount(name: string): void {
    this.unReadCountMap.delete(name);
  }

  addUnReadCount(recruitId: string): void {
    const keys = Array.from(this.unReadCountMap.keys()).filter(
      (key) => key.split(':')[0] === recruitId,
    );
    keys.map((key) => {
      this.unReadCountMap.set(key, this.unReadCountMap.get(key) + 1);
    });
  }
}
