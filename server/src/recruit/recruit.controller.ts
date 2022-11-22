import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { CreateRecruitDto } from "./dto/create-recruit.dto";
import { JoinRecruitDto } from "./dto/join-recruit.dto";
import { RecruitService } from "./recruit.service";

@Controller("recruit")
export class RecruitController {
    constructor(private readonly recruitService: RecruitService) {}

    @Get()
    async getRecruits(@Query("page") page: number, @Query("pageSize") pageSize?: number) {
        const recruitList = await this.recruitService.getRecruitList(page, pageSize || 10);
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

    @Post()
    async register(@Body() joinRecruitDto: JoinRecruitDto) {
        return {
            statusCode: 201,
            success: true,
        };
    }
}
