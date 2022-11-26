import { Body, Controller, Get, Post, Query, Param, Req } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CreateRecruitDto } from "./dto/create-recruit.dto";
import { GetRecruitDto } from "./dto/get-recruit.dto";
import { JoinRecruitDto } from "./dto/join-recruit.dto";
import { RecruitService } from "./recruit.service";
import { Request } from "express";

@Controller("recruit")
export class RecruitController {
    constructor(private readonly recruitService: RecruitService, private jwtService: JwtService) {}

    @Get()
    async getRecruits(@Query() queryParams: GetRecruitDto) {
        const recruitList = await this.recruitService.getRecruitList(queryParams);
        return {
            statusCode: 200,
            data: recruitList,
        };
    }

    @Post()
    async create(@Body() createRecruitDto: CreateRecruitDto) {
        const recruitEntity = await this.recruitService.create(createRecruitDto);
        // TODO: 응답 리팩토링하기 entity -> 응답 dto 변환 후 인터셉터가 상태코드 넣어서 처리하게끔 바꾸기
        // 매번 상태코드와 데이터 넣어주는 방식이 깔끔하지 못한 느낌.
        return {
            statusCode: 201,
            data: {
                recruitId: recruitEntity.id,
            },
        };
    }
    // @UseGuards(AccessGuard)
    @Post("join")
    async register(@Body() joinRecruitDto: JoinRecruitDto) {
        const recruitId = joinRecruitDto.getRecruitId();
        const userId = joinRecruitDto.getUserId();
        if (!(await this.recruitService.isExistRecruit(recruitId))) {
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
        this.recruitService.join(userId, recruitId);
        return {
            statusCode: 201,
        };
    }

    @Get(":id")
    async getRecruitDetail(@Param("id") recruitId: number, @Req() request: Request) {
        const jwtString = request.headers["authorization"].split("Bearer")[1].trim();
        const { userIdx } = this.jwtService.verify(jwtString, { secret: process.env.ACCESS_SECRET });
        const data = await this.recruitService.getRecruitDetail(recruitId);
        return {
            ...data,
            isAuthor: data.authorId === userIdx,
            isParticipating: await this.recruitService.isParticipating(recruitId, userIdx),
        };
    }
}
