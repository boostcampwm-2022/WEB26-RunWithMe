import { Module } from "@nestjs/common";
import { CourseService } from "./course.service";
import { CourseController } from "./course.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmCustomModule } from "../common/typeorm/typeorm.module";
import { Course } from "../common/entities/course.entity";
import { CourseRepository } from "../common/repositories/course.repository";

@Module({
    imports: [TypeOrmModule.forFeature([Course]), TypeOrmCustomModule.forCustomRepository([CourseRepository])],
    controllers: [CourseController],
    providers: [CourseService],
})
export class CourseModule {}
