import { Injectable } from "@nestjs/common";
import { Course } from "src/entities/course.entity";
import { CourseRepository } from "./course.repository";
import { CreateCourseDto } from "./dto/create-course.dto";

@Injectable()
export class CourseService {
    constructor(private courseRepository: CourseRepository) {}
    async create(createRecruitDto: CreateCourseDto): Promise<Course> {
        const courseEntity = createRecruitDto.toEntity();
        return this.courseRepository.createOne(courseEntity);
    }
}
