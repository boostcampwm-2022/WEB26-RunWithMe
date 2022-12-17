import { Module } from "@nestjs/common";
import { UserRepository } from "../common/repositories/user.repository";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmCustomModule } from "../common/typeorm/typeorm.module";
import { User } from "../common/entities/user.entity";
import { CourseRepository } from "../common/repositories/course.repository";
import { RecruitRepository } from "../common/repositories/recruit.repository";
import { HttpModule } from "@nestjs/axios";
@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        TypeOrmCustomModule.forCustomRepository([UserRepository, CourseRepository, RecruitRepository]),
        HttpModule,
    ],
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService],
})
export class UserModule {}
