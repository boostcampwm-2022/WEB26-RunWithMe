import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get("test")
    async doTest() {
        const data = await this.appService.doTest();
        return data;
    }
}
