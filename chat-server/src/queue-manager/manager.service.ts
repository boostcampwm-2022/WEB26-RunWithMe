import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import * as Bull from 'bull';

@Injectable()
export class ManagerService {
  constructor(@Inject(CACHE_MANAGER) private redisCache: Cache) {} // 여기에서 가져온 캐시는 레디스
  async generateQueue(name: string) {
    const queue = new Bull(name);
    queue.pause();
    await this.redisCache.set(name, queue);
    // 이후, 서버 메모리에 key: "7:June1010", val: Queue Instance 저장해주기

    // queue.process(메시지 전송하는 콜백함수) [2] : process 등록
    // queue.pause() [1] :  모집신청/참가신청
    // queue.resume() [3] : 온라인일경우 process 재개 socket.onconnect()
    // socket.ondisconnect() ->  pause()
    // socket에 합치는게 좋을 듯 -> 석준의 의견
    return queue;
  }

  // 특정 큐에 소켓 전송 이벤트 emit/broadcast하는 걸 여기에 등록해주는 메서드.
  // registerCallback(name: string, func: Function) {queue.process(func)}

  async deleteQueue(name: string) {
    const deleteWork = [];
    const keyArr = await this.redisCache.store.keys(`bull:${name}:*`);
    keyArr.map((key: string) => {
      deleteWork.push(this.redisCache.del(key));
    }); // bull.js Queue 지우는용
    deleteWork.push(this.redisCache.del(name)); // 매핑된 인스턴스 지우는용
    return Promise.all(deleteWork);
  }

  async getQueue(name: string): Promise<Bull.Queue> {
    return this.redisCache.get(name);
    // 서버 메모리에서, name(key) 값으로 Queue Instance 가져와서 반환해주기
  }

  async getQueueList(recruitId: string) {
    return this.redisCache.store.keys(`${recruitId}:*`);
  }
}

// 온라인인 유저 상태 관리 -> 그래야 send 이벤트를 발생을 시켜서 값을 가져오니깐
// 온라인이면 -> 바로 전송
// 오프라인이면 -> 큐에 누적

// 지금 Cache Module에서 사용하는건, 레디스인데, Cache Module 메모리와 레디스를 함께 쓸 순 없을까?
