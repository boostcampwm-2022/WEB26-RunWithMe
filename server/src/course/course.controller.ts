import { Body, Controller, Get, NotFoundException, Param, Post, Query } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { CourseService } from "./course.service";
import { CreateCourseDto } from "./dto/request/create-course.dto";
import { GetCourseDto } from "./dto/request/get-course.dto";

@Controller("course")
@ApiTags("코스 관리")
export class CourseController {
    constructor(private readonly courseService: CourseService) {}

    @ApiOperation({ summary: "코스 등록", description: "코스를 등록한다" })
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

    @ApiOperation({ summary: "코스 목록 조회/검색/필터", description: "등록된 코스 목록을 조회/검색/필터링한다" })
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

    @ApiOperation({ summary: "코스 상세", description: "코스 상세내용을 가져온다" })
    @Get(":id")
    async getOne(@Param("id") courseId: number) {
        if (!(await this.courseService.isExistingCourse(courseId))) {
            throw new NotFoundException("Does not exist or has been deleted");
        }
        const data = await this.courseService.getOne(courseId);
        return { statusCode: 200, data };
    }
}
