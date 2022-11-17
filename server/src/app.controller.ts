import { Controller } from "@nestjs/common";
import { AppService } from "./app.service";
import { Cache } from "cache-manager";
import { Inject, CACHE_MANAGER } from "@nestjs/common";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService, @Inject(CACHE_MANAGER) private cacheManager: Cache) {}

    @Get("test")
    async doTest() {
        await this.cacheManager.set(`1`, 1);
        const redisvalue = await this.cacheManager.get("1");
        console.log(redisvalue);
        console.log("hihidsdffhsdfsfdihihi");
    }
}
