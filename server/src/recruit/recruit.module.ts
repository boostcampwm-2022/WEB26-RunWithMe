import { Module } from "@nestjs/common";
import { RecruitService } from "./recruit.service";
import { RecruitController } from "./recruit.controller";
import { TypeOrmCustomModule } from "src/common/typeorm/typeorm.module";
import { RecruitRepository } from "./recruit.repository";
import { AuthService } from "src/auth/auth.service";
import { UserRepository } from "src/user/user.repository";
import { JwtService } from "@nestjs/jwt";
import { AuthRepository } from "src/auth/auth.repository";
import { UserRecruitRepository } from "src/user_recruit.repository";

@Module({
    imports: [TypeOrmCustomModule.forCustomRepository([RecruitRepository, UserRepository, UserRecruitRepository])],
    controllers: [RecruitController],
    providers: [RecruitService, AuthService, JwtService, AuthRepository],
})
export class RecruitModule {}
