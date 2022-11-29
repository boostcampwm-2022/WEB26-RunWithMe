import { Body, Controller, Get, Post, Query, Param, Req, NotFoundException } from "@nestjs/common";
import { CreateRecruitDto } from "./dto/request/create-recruit.request";
import { GetRecruitDto } from "./dto/request/get-recruit.request";
import { JoinRecruitDto } from "./dto/request/join-recruit.request";
import { RecruitService } from "./recruit.service";
import { Request } from "express";
import { ApiOperation } from "@nestjs/swagger";

@Controller("recruit")
export class RecruitController {
    constructor(private readonly recruitService: RecruitService) {}

    @ApiOperation({ summary: "모집글 조회/검색/필터 API" })
    @Get()
    async getMany(@Query() queryParams: GetRecruitDto) {
        const recruitList = await this.recruitService.getMany(queryParams);
        return {
            statusCode: 200,
            data: recruitList,
        };
    }

    @ApiOperation({ summary: "모집글 등록 API" })
    @Post()
    async create(@Body() createRecruitDto: CreateRecruitDto) {
        const recruitEntity = await this.recruitService.create(createRecruitDto);
        return {
            statusCode: 201,
            data: {
                recruitId: recruitEntity.id,
            },
        };
    }

    @ApiOperation({ summary: "" })
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
        this.recruitService.join(userId, recruitId);
        return {
            statusCode: 201,
        };
    }

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
