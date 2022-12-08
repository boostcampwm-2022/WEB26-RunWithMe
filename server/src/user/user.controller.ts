import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { ResponseEntity } from "../common/response/response.entity";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateUserRequestDto } from "./dto/request/create-user.request";
import { CheckUserRequestDto } from "./dto/request/check-user.request";
import { CheckUserResponseDto } from "./dto/response/check-user.response";
import { GetCoursesResponseDto } from "../course/dto/response/get-courses.response";
import { GetRecruitsResponseDto } from "../recruit/dto/response/get-recruits.response";
import { GetProfileResponseDto } from "./dto/response/get-profile.response";
import { HttpService } from "@nestjs/axios";
import { AxiosError } from "axios";
import { catchError, firstValueFrom } from "rxjs";

@Controller("user")
@ApiTags("사용자 관리")
export class UserController {
    constructor(private userService: UserService, private httpService: HttpService) {}

    @ApiOperation({ summary: "유저 회원가입", description: "회원가입한다" })
    @Post()
    async create(@Body() createUserRequestDto: CreateUserRequestDto) {
        await this.userService.create(createUserRequestDto);

        if (createUserRequestDto.getReceiveMail()) {
            await firstValueFrom(
                this.httpService
                    .post(`${process.env.NOTI_SERVER_API_URL}/job/signup`, {
                        id: createUserRequestDto.getUserId(),
                        email: createUserRequestDto.getEmail(),
                    })
                    .pipe(
                        catchError((error: AxiosError) => {
                            throw error;
                        }),
                    ),
            );
        }

        return ResponseEntity.OK();
    }

    @ApiOperation({ summary: "내 정보", description: "내 정보를 가져온다" })
    @Get("me")
    async getMyProfile(@Param("userId") userIdx: number) {
        const myProfileEntity = await this.userService.getProfileByUserIdx(userIdx);
        const myProfileResponseDto = GetProfileResponseDto.fromEntity(myProfileEntity);
        return ResponseEntity.OK_WITH_DATA(myProfileResponseDto);
    }

    @ApiOperation({ summary: "중복 아이디 확인", description: "파라미터로 넘긴 id가 이미 가입되어 있는지 확인한다" })
    @Get(":id")
    async checkId(@Param() checkUserRequestDto: CheckUserRequestDto) {
        const data = await this.userService.checkId(checkUserRequestDto);
        const checkUserResponseDto = CheckUserResponseDto.from(data);
        return ResponseEntity.OK_WITH_DATA(checkUserResponseDto);
    }

    @ApiOperation({ summary: "유저 등록 코스", description: "유저가 등록한 코스들을 가져온다" })
    @Get("me/course")
    async getCourseByUserIdx(@Param("userId") userIdx: number) {
        const coursesEntity = await this.userService.getCoursesByUserIdx(userIdx);
        const coursesByUserResDto = GetCoursesResponseDto.fromEntity(coursesEntity);
        return ResponseEntity.OK_WITH_DATA(coursesByUserResDto);
    }

    @ApiOperation({ summary: "유저 참여중 모집", description: "유저가 참여중인 모집들을 가져온다" })
    @Get("me/recruit")
    async getRecruitByUserIdx(@Param("userId") userIdx: number) {
        const recruitsEntity = await this.userService.getRecruitsByUserIdx(userIdx);
        const recruitsByUserResDto = GetRecruitsResponseDto.fromEntity(recruitsEntity);
        return ResponseEntity.OK_WITH_DATA(recruitsByUserResDto);
    }
}
