import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { Cache } from "cache-manager";

@Injectable()
export class AuthRepository {
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

    async saveToken(token: string, userId: string) {
        await this.cacheManager.set(userId, token);
    }

    async deleteToken(userId: number) {
        await this.cacheManager.store.del(userId);
    }
}
