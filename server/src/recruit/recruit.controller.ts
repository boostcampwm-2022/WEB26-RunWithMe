import { Body, Controller, Get, Post, Query, Param, Req, NotFoundException } from "@nestjs/common";
import { CreateRecruitReqDto } from "./dto/request/create-recruit.request";
import { GetRecruitDto } from "./dto/request/get-recruit.request";
import { JoinRecruitDto } from "./dto/request/join-recruit.request";
import { RecruitService } from "./recruit.service";
import { Request } from "express";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateRecruitResDto } from "./dto/response/create-recruit.response";
import { ResponseEntity } from "src/common/response/response.entity";

@Controller("recruit")
@ApiTags("모집글 관리")
export class RecruitController {
    constructor(private readonly recruitService: RecruitService) {}

    @ApiOperation({ summary: "모집글 조회/검색/필터", description: "등록된 모집글들을 조회/검색/필터링한다" })
    @Get()
    async getMany(@Query() queryParams: GetRecruitDto) {
        const recruitList = await this.recruitService.getMany(queryParams);
        return {
            statusCode: 200,
            data: recruitList,
        };
    }

    @ApiOperation({ summary: "모집글 등록", description: "모집글을 등록한다" })
    @Post()
    async create(@Body() createRecruitDto: CreateRecruitReqDto) {
        const recruitEntity = await this.recruitService.create(createRecruitDto);
        const recruitResDto = CreateRecruitResDto.fromEntity(recruitEntity);
        const sth = ResponseEntity.OK_WITH<CreateRecruitResDto>(recruitResDto);
        console.log(sth);
        return sth;
    }

    @ApiOperation({ summary: "모집 참가", description: "모집글에 참여한다" })
    @Post("join")
    async register(@Body() joinRecruitDto: JoinRecruitDto) {
        const recruitId = joinRecruitDto.getRecruitId();
        const userId = joinRecruitDto.getUserId();
        if (!(await this.recruitService.isExistingRecruit(recruitId))) {
            return {
                statusCode: 409,
                error: "conflict",
                message: "Does not exist or has been deleted",
            };
        }
        if (await this.recruitService.isAuthorOfRecruit(recruitId, userId)) {
            return {
                statusCode: 423,
                error: "Locked",
                message: "Cannot participate in your own recruitment",
            };
        }

        if (await this.recruitService.isParticipating(recruitId, userId)) {
            return {
                statusCode: 423,
                error: "Locked",
                message: "You have already participated.",
            };
        }
        if (!(await this.recruitService.isVacancy(recruitId))) {
            return {
                statusCode: 423,
                error: "Locked",
                message: "Maximum cap reached",
            };
        }
        this.recruitService.join(joinRecruitDto);
        return {
            statusCode: 201,
        };
    }

    @ApiOperation({ summary: "모집 상세", description: "모집 상세내용을 가져온다" })
    @Get(":id")
    async getOne(@Param("id") recruitId: number, @Req() request: Request) {
        const jwtString = request.headers["authorization"].split("Bearer")[1].trim();
        if (!(await this.recruitService.isExistingRecruit(recruitId))) {
            throw new NotFoundException("Does not exist or has been deleted");
        }
        const data = await this.recruitService.getOne(jwtString, recruitId);
        return data;
    }
}
