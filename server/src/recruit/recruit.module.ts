import { Module } from "@nestjs/common";
import { RecruitService } from "./recruit.service";
import { RecruitController } from "./recruit.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmCustomModule } from "src/common/typeorm/typeorm.module";
import { HDong } from "src/entities/h_dong.entity";
import { Recruit } from "src/entities/recruit.entity";
import { RecruitRepository } from "./recruit.repository";
import { HDongRepository } from "src/common/repository/h_dong.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([Recruit, HDong]),
        TypeOrmCustomModule.forCustomRepository([RecruitRepository, HDongRepository]),
    ],
    controllers: [RecruitController],
    providers: [RecruitService],
})
export class RecruitModule {}
