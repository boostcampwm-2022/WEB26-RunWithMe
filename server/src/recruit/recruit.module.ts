import { Module } from "@nestjs/common";
import { RecruitService } from "./recruit.service";
import { RecruitController } from "./recruit.controller";
import { TypeOrmCustomModule } from "../common/typeorm/typeorm.module";
import { UserRepository } from "../common/repositories/user.repository";
import { UserRecruitRepository } from "../common/repositories/user_recruit.repository";
import { RecruitRepository } from "../common/repositories/recruit.repository";
import { CustomJwtModule } from "../common/modules/custom-jwt/custom-jwt.module";
import { HttpModule } from "@nestjs/axios";
import { UserModule } from "src/user/user.module";

@Module({
    imports: [
        TypeOrmCustomModule.forCustomRepository([RecruitRepository, UserRepository, UserRecruitRepository]),
        CustomJwtModule,
        HttpModule,
        UserModule,
    ],
    providers: [RecruitService],
    controllers: [RecruitController],
})
export class RecruitModule {}
