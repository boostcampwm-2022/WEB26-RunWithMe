import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { ResponseEntity } from "../common/response/response.entity";
import { CourseService } from "./course.service";
import { CreateCourseRequestDto } from "./dto/request/create-course.request";
import { GetCourseRequestDto } from "./dto/request/get-course.request";
import { GetCoursesRequestDto } from "./dto/request/get-courses.request";
import { CreateCourseResponseDto } from "./dto/response/create-course.response";
import { GetCourseResponseDto } from "./dto/response/get-course.response";

@Controller("course")
@ApiTags("코스 관리")
export class CourseController {
    constructor(private readonly courseService: CourseService) {}

    @ApiOperation({ summary: "코스 목록 조회/검색/필터", description: "등록된 코스 목록을 조회/검색/필터링한다" })
    @Get()
    async getMany(@Query() queryParams: GetCoursesRequestDto) {
        const courseList = await this.courseService.getMany(queryParams);
        const getCoursesResponseDto = GetCourseResponseDto.fromEntity(courseList);
        return ResponseEntity.OK_WITH_DATA(getCoursesResponseDto);
    }

    @ApiOperation({ summary: "코스 등록", description: "코스를 등록한다" })
    @Post()
    async create(@Body() createCourseDto: CreateCourseRequestDto) {
        const courseEntity = await this.courseService.create(createCourseDto);
        const createCourseResponseDto = CreateCourseResponseDto.fromEntity(courseEntity);
        return ResponseEntity.CREATED_WITH_DATA(createCourseResponseDto);
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
    async getOne(@Param() getCourseRequestDto: GetCourseRequestDto) {
        if (!(await this.courseService.isExistingCourse(getCourseRequestDto.getCourseId()))) {
            return ResponseEntity.NOT_FOUND("존재하지 않는 게시글입니다");
        }
        const courseEntity = await this.courseService.getOne(getCourseRequestDto.getCourseId());
        const getCourseResponseDto = GetCourseResponseDto.fromEntity(courseEntity);
        return ResponseEntity.OK_WITH_DATA(getCourseResponseDto);
    }
}
