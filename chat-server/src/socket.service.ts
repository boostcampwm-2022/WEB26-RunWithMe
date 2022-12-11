import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inject, CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Chat } from './common/entities/chat.entity';

type CacheValue = {
  userId: string;
  recruitId: number;
};

export class SocketService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectRepository(Chat) private chatRepository: Repository<Chat>,
  ) {}

  async getCacheData(socketId: string): Promise<CacheValue> {
    console.log(await this.cacheManager.get(`id:${socketId}`));
    return this.cacheManager.get(`id:${socketId}`);
  }

  async setCacheData(socketId: string, data: CacheValue): Promise<void> {
    return this.cacheManager.set(`id:${socketId}`, data);
  }

  async delCacheData(socketId: string): Promise<void> {
    return this.cacheManager.del(`id:${socketId}`);
  }

  async getRecentMessage() {
    const response = await this.chatRepository.find({
      order: {
        createdAt: 'DESC',
      },
      take: 10,
    });

    return response.reverse();
  }

  async saveRecentMessage(chatEntity: Chat) {
    return this.chatRepository.save(chatEntity);
  }
}
