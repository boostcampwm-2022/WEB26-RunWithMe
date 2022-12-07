import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { CheckUserDto } from "./dto/check-user.dto";
import { ResponseEntity } from "../common/response/response.entity";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { GetCoursesUserDto } from "./dto/response/get-courses-user";
import { GetManyResponseDto } from "src/course/dto/response/get-many.response";

@Controller("user")
@ApiTags("사용자 관리")
export class UserController {
    constructor(private userService: UserService) {}

    @ApiOperation({ summary: "유저 회원가입", description: "회원가입한다" })
    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        await this.userService.create(createUserDto);
        return ResponseEntity.OK();
    }

    @ApiOperation({ summary: "중복 아이디 확인", description: "파라미터로 넘긴 id가 이미 가입되어 있는지 확인한다" })
    @Get(":userId")
    async checkId(@Param() checkUserDto: CheckUserDto) {
        return this.userService.checkId(checkUserDto);
    }

    @ApiOperation({ summary: "유저 등록 코스", description: "유저가 등록한 코스들을 가져온다" })
    @Get("me/course")
    async getCourseByUserId(@Param("userId") userId: number) {
        const coursesEntity = await this.userService.getCoursesByUserId(userId);
        // console.log(coursesEntity);
        const coursesByUserResDto = GetCoursesUserDto.fromEntity(coursesEntity);
        return ResponseEntity.OK_WITH_DATA(coursesByUserResDto);
    }

    @ApiOperation({ summary: "유저 참여중 모집", description: "유저가 참여중인 모집들을 가져온다" })
    @Get("me/recruit")
    async getRecruitByUserId(@Param("userId") userId: number) {
        const recruitsEntity = await this.userService.getRecruitsByUserId(userId);
        const recruitsByUserResDto = GetManyResponseDto.fromEntity(recruitsEntity);
        return ResponseEntity.OK_WITH_DATA(recruitsByUserResDto);
    }
}
