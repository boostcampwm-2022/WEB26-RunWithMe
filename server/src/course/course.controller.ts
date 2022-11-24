import { Body, Controller, Post } from "@nestjs/common";
import { CourseService } from "./course.service";
import { CreateCourseDto } from "./dto/create-course.dto";

@Controller("course")
export class CourseController {
    constructor(private readonly courseService: CourseService) {}

    @Post()
    async create(@Body() createCourseDto: CreateCourseDto) {
        const courseEntity = await this.courseService.create(createCourseDto);
        return {
            statusCode: 201,
            data: {
                courseId: courseEntity.id,
            },
        };
    }
}
