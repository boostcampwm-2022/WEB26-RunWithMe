import { Body, Controller, Get, Post, Query, Param } from "@nestjs/common";
import { CreateRecruitReqDto } from "./dto/request/create.request";
import { GetRecruitDto } from "./dto/request/get-many.request";
import { JoinRecruitDto } from "./dto/request/join-recruit.request";
import { RecruitService } from "./recruit.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateResponseDto } from "./dto/response/create.response";
import { ResponseEntity } from "src/common/response/response.entity";
import { GetManyResponseDto } from "./dto/response/get-many.response";
import { GetOneResponseDto } from "./dto/response/get-one.response";

@Controller("recruit")
@ApiTags("모집글 관리")
export class RecruitController {
    constructor(private readonly recruitService: RecruitService) {}

    @ApiOperation({ summary: "모집글 조회/검색/필터", description: "등록된 모집글들을 조회/검색/필터링한다" })
    @Get()
    async getMany(@Query() queryParams: GetRecruitDto) {
        const recruitList = await this.recruitService.getMany(queryParams);
        const recruitResDto = GetManyResponseDto.fromEntity(recruitList);
        return ResponseEntity.OK_WITH_DATA(recruitResDto);
    }

    @ApiOperation({ summary: "모집글 등록", description: "모집글을 등록한다" })
    @Post()
    async create(@Body() createRecruitDto: CreateRecruitReqDto) {
        const recruitEntity = await this.recruitService.create(createRecruitDto);
        const recruitResDto = CreateResponseDto.fromEntity(recruitEntity);
        return ResponseEntity.OK_WITH_DATA(recruitResDto);
    }

    @ApiOperation({ summary: "모집 참가", description: "모집글에 참여한다" })
    @Post("join")
    async register(@Body() joinRecruitDto: JoinRecruitDto) {
        const recruitId = joinRecruitDto.getRecruitId();
        const userId = joinRecruitDto.getUserId();

        if (!(await this.recruitService.isExistingRecruit(recruitId))) {
            ResponseEntity.NOT_FOUND("존재하지 않는 게시글입니다");
        }
        if (await this.recruitService.isAuthorOfRecruit(recruitId, userId)) {
            ResponseEntity.LOCKED("자신의 게시글에 참가할 수 없습니다");
        }

        if (await this.recruitService.isParticipating(recruitId, userId)) {
            ResponseEntity.LOCKED("이미 참여중인 게시글입니다");
        }
        if (!(await this.recruitService.isVacancy(recruitId))) {
            ResponseEntity.LOCKED("모집 상한에 도달했습니다");
        }
        this.recruitService.join(joinRecruitDto);
        return ResponseEntity.CREATED();
    }

    @ApiOperation({ summary: "모집 상세", description: "모집 상세내용을 가져온다" })
    @Get(":id")
    async getOne(@Param("id") recruitId: number, @Param("userId") userId: number) {
        if (!(await this.recruitService.isExistingRecruit(recruitId))) {
            return ResponseEntity.NOT_FOUND("존재하지 않는 게시글입니다");
        }
        const recruitEntity = await this.recruitService.getOne(userId, recruitId);
        const recruitResDto = GetOneResponseDto.fromEntity(recruitEntity);
        return ResponseEntity.OK_WITH_DATA(recruitResDto);
    }
}
