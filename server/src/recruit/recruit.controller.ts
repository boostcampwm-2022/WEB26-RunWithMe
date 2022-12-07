import { Body, Controller, Get, Post, Query, Param } from "@nestjs/common";
import { CreateRecruitRequestDto } from "./dto/request/create-recruit.request";
import { GetRecruitsRequestDto } from "./dto/request/get-recruits.request";
import { JoinRecruitRequestDto } from "./dto/request/join-recruit.request";
import { RecruitService } from "./recruit.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateRecruitResponseDto } from "./dto/response/create-recruit.response";
import { ResponseEntity } from "../common/response/response.entity";
import { GetRecruitsResponseDto } from "./dto/response/get-recruits.response";
import { GetRecruitResponseDto } from "./dto/response/get-recruit.response";
import { GetRecruitRequestDto } from "./dto/request/get-recruit.request";

@Controller("recruit")
@ApiTags("모집글 관리")
export class RecruitController {
    constructor(private readonly recruitService: RecruitService) {}

    @ApiOperation({ summary: "모집글 조회/검색/필터", description: "등록된 모집글들을 조회/검색/필터링한다" })
    @Get()
    async getMany(@Query() queryParams: GetRecruitsRequestDto) {
        const recruitList = await this.recruitService.getMany(queryParams);
        const getRecruitResponseDto = GetRecruitsResponseDto.fromEntity(recruitList);
        return ResponseEntity.OK_WITH_DATA(getRecruitResponseDto);
    }

    @ApiOperation({ summary: "모집글 등록", description: "모집글을 등록한다" })
    @Post()
    async create(@Body() createRecruitDto: CreateRecruitRequestDto) {
        const recruitEntity = await this.recruitService.create(createRecruitDto);
        const createRecruitResponseDto = CreateRecruitResponseDto.fromEntity(recruitEntity);
        return ResponseEntity.CREATED_WITH_DATA(createRecruitResponseDto);
    }

    @ApiOperation({ summary: "모집 참가", description: "모집글에 참여한다" })
    @Post("join")
    async register(@Body() joinRecruitDto: JoinRecruitRequestDto) {
        const recruitId = joinRecruitDto.getRecruitId();
        const userId = joinRecruitDto.getUserId();

        if (!(await this.recruitService.isExistingRecruit(recruitId))) {
            return ResponseEntity.NOT_FOUND("존재하지 않는 게시글입니다");
        }
        if (await this.recruitService.isAuthorOfRecruit(recruitId, userId)) {
            return ResponseEntity.LOCKED("자신의 게시글에 참가할 수 없습니다");
        }
        if (await this.recruitService.isParticipating(recruitId, userId)) {
            return ResponseEntity.LOCKED("이미 참여중인 게시글입니다");
        }
        if (!(await this.recruitService.isVacancy(recruitId))) {
            return ResponseEntity.LOCKED("모집 상한에 도달했습니다");
        }
        this.recruitService.join(joinRecruitDto);
        return ResponseEntity.CREATED();
    }

    @ApiOperation({ summary: "모집 상세", description: "모집 상세내용을 가져온다" })
    @Get(":id")
    async getOne(@Param() getRecruitRequestDto: GetRecruitRequestDto) {
        if (!(await this.recruitService.isExistingRecruit(getRecruitRequestDto.getRecruitId()))) {
            return ResponseEntity.NOT_FOUND("존재하지 않는 게시글입니다");
        }
        const recruitEntity = await this.recruitService.getOne(
            getRecruitRequestDto.getUserId(),
            getRecruitRequestDto.getRecruitId(),
        );
        const getRecruitResponseDto = GetRecruitResponseDto.fromEntity(recruitEntity);
        return ResponseEntity.OK_WITH_DATA(getRecruitResponseDto);
    }
}
