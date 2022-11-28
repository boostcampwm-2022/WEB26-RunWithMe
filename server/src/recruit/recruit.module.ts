import { Module } from "@nestjs/common";
import { RecruitService } from "./recruit.service";
import { RecruitController } from "./recruit.controller";
import { TypeOrmCustomModule } from "src/common/typeorm/typeorm.module";
import { AuthService } from "src/auth/auth.service";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { AuthRepository } from "src/common/repositories/auth.repository";
import { UserRepository } from "src/common/repositories/user.repository";
import { UserRecruitRepository } from "src/common/repositories/user_recruit.repository";
import { RecruitRepository } from "../common/repositories/recruit.repository";
import { CustomJwtModule } from "src/common/modules/custom-jwt/custom-jwt.module";

@Module({
    imports: [
        TypeOrmCustomModule.forCustomRepository([RecruitRepository, UserRepository, UserRecruitRepository]),
        CustomJwtModule,
    ],
    controllers: [RecruitController],
    providers: [RecruitService, AuthService, AuthRepository],
})
export class RecruitModule {}
