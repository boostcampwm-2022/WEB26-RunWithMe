import { Module } from "@nestjs/common";
import { RecruitService } from "./recruit.service";
import { RecruitController } from "./recruit.controller";
import { AuthService } from "src/auth/auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmCustomModule } from "src/common/typeorm/typeorm.module";
import { JwtService } from "@nestjs/jwt";
import { AuthRepository } from "src/auth/auth.repository";
import { UserRepository } from "src/user/user.repository";
import { UserRecruitRepository } from "src/user_recruit.repository";
import { RecruitRepository } from "./recruit.repository";
import { HDongRepository } from "src/common/repository/h_dong.repository";

@Module({
    imports: [
        TypeOrmCustomModule.forCustomRepository([
            RecruitRepository, 
            UserRepository, 
            UserRecruitRepository, 
            HDongRepository
        ]),
    controllers: [RecruitController],
    providers: [RecruitService, AuthService, JwtService, AuthRepository],
})
export class RecruitModule {}
