import { Module } from "@nestjs/common";
import { RecruitService } from "./recruit.service";
import { RecruitController } from "./recruit.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmCustomModule } from "src/common/typeorm/typeorm.module";
import { Recruit } from "src/entities/recruit.entity";
import { RecruitRepository } from "./recruit.repository";
import { AuthService } from "src/auth/auth.service";
import { UserRepository } from "src/user/user.repository";
import { JwtService } from "@nestjs/jwt";
import { AuthRepository } from "src/auth/auth.repository";
import { UserRecruitRepository } from "src/user_recruit.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([Recruit]),
        TypeOrmCustomModule.forCustomRepository([RecruitRepository]),
        TypeOrmCustomModule.forCustomRepository([UserRepository]),
        TypeOrmCustomModule.forCustomRepository([UserRecruitRepository]),
    ],
    controllers: [RecruitController],
    providers: [RecruitService, AuthService, JwtService, AuthRepository],
})
export class RecruitModule {}
