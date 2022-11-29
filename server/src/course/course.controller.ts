import { Body, Controller, Get, NotFoundException, Param, Post, Query } from "@nestjs/common";
import { count } from "console";
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
    async getMany(@Query() queryParams: GetCourseDto) {
        const courseList = await this.courseService.getMany(queryParams);
        return {
            statusCode: 200,
            data: courseList,
        };
    }
    @Get("count")
    async getCount() {
        const courseCount = await this.courseService.getCount();
        return {
            statusCode: 200,
            data: courseCount,
        };
    }

    @Get(":id")
    async getOne(@Param("id") courseId: number) {
        if (!(await this.courseService.isExistingCourse(courseId))) {
            throw new NotFoundException("Does not exist or has been deleted");
        }
        const data = await this.courseService.getOne(courseId);
        return data;
    }
}
