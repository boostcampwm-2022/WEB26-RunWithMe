import { Inject, CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat, ChatDocument } from './common/schemas/chat.schema';
import { ManagerService } from './queue-manager/manager.service';

type CacheValue = {
  userId: string;
  recruitId: number;
};

export class SocketService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectModel(Chat.name) private chatModel: Model<ChatDocument>,
    private managerService: ManagerService,
  ) {}

  async getCacheData(socketId: string): Promise<CacheValue> {
    return this.cacheManager.get(`id:${socketId}`);
  }

  async setCacheData(socketId: string, data: CacheValue): Promise<void> {
    return this.cacheManager.set(`id:${socketId}`, data);
  }

  async delCacheData(socketId: string): Promise<void> {
    return this.cacheManager.del(`id:${socketId}`);
  }

  async getRecentMessage(recruitId: number) {
    const response = await this.chatModel
      .find({ recruitId })
      .sort({ createdAt: -1 })
      .limit(10);
    return response.reverse();
  }

  async saveRecentMessage(chatEntity: Chat) {
    return this.chatModel.create(chatEntity);
  }
}
