import { Module } from "@nestjs/common";
import { CourseService } from "./course.service";
import { CourseController } from "./course.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmCustomModule } from "src/common/typeorm/typeorm.module";
import { Course } from "src/entities/course.entity";
import { CourseRepository } from "./course.repository";

@Module({
    imports: [TypeOrmModule.forFeature([Course]), TypeOrmCustomModule.forCustomRepository([CourseRepository])],
    controllers: [CourseController],
    providers: [CourseService],
})
export class CourseModule {}
