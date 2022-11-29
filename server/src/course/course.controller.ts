import { Body, ConflictException, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { CourseService } from "./course.service";
import { CreateCourseDto } from "./dto/create-course.dto";
import { GetCourseDto } from "./dto/get-course.dto";

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

    @Get()
    async getCourses(@Query() queryParams: GetCourseDto) {
        const courseList = await this.courseService.getCourseList(queryParams);
        return {
            statusCode: 200,
            data: courseList,
        };
    }

    @Get(":id")
    async getCourseDetail(@Param("id") courseId: number) {
        if (!(await this.courseService.isExistingCourse(courseId))) {
            throw new ConflictException("Does not exist or has been deleted");
        }
        const data = await this.courseService.getCourseDetail(courseId);
        return data;
    }
}
