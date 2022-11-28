import { Module } from "@nestjs/common";
import { RecruitService } from "./recruit.service";
import { RecruitController } from "./recruit.controller";
import { TypeOrmCustomModule } from "src/common/typeorm/typeorm.module";
import { AuthService } from "src/auth/auth.service";
import { JwtService } from "@nestjs/jwt";
import { AuthRepository } from "src/common/repositories/auth.repository";
import { UserRepository } from "src/common/repositories/user.repository";
import { UserRecruitRepository } from "src/user_recruit.repository";
import { RecruitRepository } from "../common/repositories/recruit.repository";

@Module({
    imports: [TypeOrmCustomModule.forCustomRepository([RecruitRepository, UserRepository, UserRecruitRepository])],
    controllers: [RecruitController],
    providers: [RecruitService, AuthService, JwtService, AuthRepository],
})
export class RecruitModule {}
