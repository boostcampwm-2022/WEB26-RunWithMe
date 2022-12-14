import { CACHE_MANAGER, Inject, Injectable, Scope } from '@nestjs/common';
import { Cache } from 'cache-manager';
import * as Bull from 'bull';
import { Socket } from 'socket.io';

@Injectable({ scope: Scope.DEFAULT })
export class ManagerService {
  constructor(
    @Inject(CACHE_MANAGER) private redisCache: Cache,
    @Inject(Map) private qMap: Map<string, Bull.Queue>,
    @Inject(Map) private sMap: Map<string, Socket>,
  ) {}
  async generateQueue(name: string) {
    const queue = new Bull(name);
    queue.pause();
    this.qMap.set(name, queue);
    return queue;
  }

  async deleteOneQueue(name: string) {
    const deleteWork = [];
    const keyArr = await this.redisCache.store.keys(`bull:${name}:*`);
    keyArr.map((key: string) => {
      deleteWork.push(this.redisCache.del(key));
    }); // bull.js Queue 지우는용
    this.qMap.delete(name); // 매핑된 인스턴스 지우는용
    return Promise.all(deleteWork);
  }

  async deleteManyQueue(recruitId: string) {
    const deleteWork = [];
    const keyArr = await this.redisCache.store.keys(`bull:${recruitId}:*`);
    keyArr.map((key: string) => {
      deleteWork.push(this.redisCache.del(key));
    }); // bull.js Queue 지우는용
    const keys = Array.from(this.qMap.keys()).filter(
      (key) => key.split(':')[0] === recruitId,
    );
    keys.map((key: string) => this.qMap.delete(key)); // 매핑된 모든 인스턴스 지우는용
  }

  // 서버 메모리에서, name(key) 값으로 Queue Instance 가져와서 반환해주기
  getQueue(name: string): Bull.Queue {
    return this.qMap.get(name);
  }

  getQueueList(recruitId: string) {
    const keys = Array.from(this.qMap.keys()).filter(
      (key) => key.split(':')[0] === recruitId,
    );
    return keys.map((key) => this.qMap.get(key));
  }

  async getQueueSize(name: string) {
    const queue = this.qMap.get(name);
    if (!queue) return 0;
    const { waiting } = await queue.getJobCounts();
    return waiting;
  }

  getSocket(name: string): Socket {
    return this.sMap.get(name);
  }

  setSocket(userId: string, socket: Socket): void {
    this.sMap.set(userId, socket);
  }

  deleteSocket(userId: string): void {
    this.sMap.delete(userId);
  }
}
