import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Job, Queue } from 'bull';
import { Cache } from 'cache-manager';

type Key = {
  recruitId: number;
  email: string;
};

@Injectable()
export class AppService {
  constructor(
    @InjectQueue('delayed') private delayedQueue: Queue,
    @InjectQueue('immediate') private immediateQueue: Queue,
    @Inject(CACHE_MANAGER) private cache: Cache,
  ) {}

  createSignUpMessage(body: any) {
    const result = {};

    result['type'] = 'signup';
    result['email'] = body.email;
    result['data'] = { id: body.id };
    return result;
  }

  // 30분 전 시작 알림
  createRecruitMessage(body: any) {
    const { recruitId, author, title, hDong, startTime, pathLength } = body;
    const result = {};

    result['type'] = 'recruit';
    result['email'] = author.email; // 이메일 하나
    result['data'] = {
      title,
      hName: hDong.name,
      startTime,
      pathLength,
      href: `https://runwithme.co.kr/recruit/${recruitId}`,
    };
    return result;
  }

  // 취소 메시지
  createCancelMessage(body: any) {
    const { title, users, hDong, startTime, pathLength } = body;
    const email = users.map((user) => user.email);
    const result = {};

    result['type'] = 'cancel';
    result['email'] = email;
    result['data'] = {
      title,
      hName: hDong.name,
      startTime,
      pathLength,
    };

    return result;
  }

  async setCacheData(key: string, value: number | string) {
    this.cache.set(key, value, 0);
  }

  async delCacheData(key: string) {
    this.cache.del(key);
  }

  async deleteDelayedJob(recruitId: number, email: string): Promise<void>;
  async deleteDelayedJob(recruitId: number, email: string[]): Promise<void>;
  async deleteDelayedJob(
    recruitId: number,
    email: string | string[],
  ): Promise<void> {
    if (!Array.isArray(email)) {
      email = [email];
    }

    const getKeys = []; // 캐시에서 키 가져오는 프로미스들
    const deleteKeys = []; // 캐시에서 키 삭제하는 프로미스들
    const keys = []; // 자스 객체를 stringify해서 만든 키들
    const getJobs = [];
    const removeJobs = [];

    email.map((email: string) => {
      const key = this.objToStr({ recruitId, email });
      keys.push(key);
    });

    keys.map((key) => {
      getKeys.push(this.cache.get(key));
    });

    const jobIds = await Promise.all(getKeys);
    jobIds.map((jobId) => {
      getJobs.push(this.delayedQueue.getJob(jobId));
    });

    keys.map((key) => {
      deleteKeys.push(this.cache.del(key));
    });

    const jobs = await Promise.all(getJobs);
    jobs.map((jobInstance: Job) => {
      removeJobs.push(jobInstance?.remove());
    });

    await Promise.all(deleteKeys);
    await Promise.all(removeJobs);
  }

  getDelayTime(_startTime: Date) {
    const startTime = new Date(_startTime);
    const now = new Date(Date.now());
    const diffToSec = +startTime - +now;

    if (diffToSec >= 30 * 60 * 1000) {
      return +diffToSec - 30 * 60 * 1000;
    }
    return 0;
  }

  async addJobToDelayedQ(jobDto: any, delay: number) {
    return this.delayedQueue.add(jobDto, {
      delay,
      removeOnComplete: true,
    });
  }

  async addJobToImmediateQ(jobDto: any) {
    await this.immediateQueue.add(jobDto, {
      removeOnComplete: true,
    });
  }

  stringToObj(str: string): JSON {
    return JSON.parse(str);
  }

  objToStr(obj: Key): string {
    return JSON.stringify(obj);
  }
}
