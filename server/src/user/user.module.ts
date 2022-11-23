import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmCustomModule } from "src/common/typeorm/typeorm.module";
import { User } from "src/entities/user.entity";
import { UserRepository } from "./user.repository";
import { UserRecruitRepository } from "src/user_recruit.repository";

@Module({
    imports: [TypeOrmModule.forFeature([User]), TypeOrmCustomModule.forCustomRepository([UserRepository])],
    providers: [UserService],
    controllers: [UserController],
})
export class UserModule {}
