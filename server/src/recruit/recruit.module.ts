import { Module } from "@nestjs/common";
import { RecruitService } from "./recruit.service";
import { RecruitController } from "./recruit.controller";

@Module({
    controllers: [RecruitController],
    providers: [RecruitService],
})
export class RecruitModule {}
