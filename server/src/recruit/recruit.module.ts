import { Module } from "@nestjs/common";
import { RecruitService } from "./recruit.service";
import { RecruitController } from "./recruit.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmCustomModule } from "src/common/typeorm/typeorm.module";
import { Recruit } from "src/entities/recruit.entity";
import { RecruitRepository } from "./recruit.repository";

@Module({
    imports: [TypeOrmModule.forFeature([Recruit]), TypeOrmCustomModule.forCustomRepository([RecruitRepository])],
    controllers: [RecruitController],
    providers: [RecruitService],
})
export class RecruitModule {}
