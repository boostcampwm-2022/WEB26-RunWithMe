import { Body, Controller, Get, Post, Query, Param, Delete } from "@nestjs/common";
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
import { DeleteRecruitRequestDto } from "./dto/request/delete-recruit.request";
import { UnjoinRecruitRequestDto } from "./dto/request/unjoin-recruit.request";
import { HttpService } from "@nestjs/axios";
import { AxiosError } from "axios";
import { catchError, firstValueFrom } from "rxjs";

@Controller("recruit")
@ApiTags("모집글 관리")
export class RecruitController {
    constructor(private readonly recruitService: RecruitService, private httpService: HttpService) {}

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
        const author = await this.recruitService.getAuthorByRecruitId(recruitEntity.id);
        const recruitDetail = await this.recruitService.getOne(createRecruitDto.getUserId(), recruitEntity.id);

        if (author) {
            const { title, hDong, startTime, pathLength } = recruitDetail;
            await firstValueFrom(
                this.httpService
                    .post(`${process.env.NOTI_SERVER_API_URL}/job/recruit`, {
                        recruitId: recruitEntity.id,
                        author,
                        title,
                        hDong,
                        startTime,
                        pathLength,
                    })
                    .pipe(
                        catchError((error: AxiosError) => {
                            throw error;
                        }),
                    ),
            );
        }
        const createRecruitResponseDto = CreateRecruitResponseDto.fromEntity(recruitEntity);
        return ResponseEntity.CREATED_WITH_DATA(createRecruitResponseDto);
    }

    @ApiOperation({ summary: "모집 취소", description: "모집을 취소한다" })
    @Delete(":id")
    async delete(@Param() deleteRecruitRequestDto: DeleteRecruitRequestDto) {
        if (!(await this.recruitService.isExistingRecruit(deleteRecruitRequestDto.getRecruitId()))) {
            return ResponseEntity.NOT_FOUND("존재하지 않는 게시글입니다");
        }
        if (
            !(await this.recruitService.isAuthorOfRecruit(
                deleteRecruitRequestDto.getRecruitId(),
                deleteRecruitRequestDto.getUserId(),
            ))
        ) {
            return ResponseEntity.LOCKED("자신의 게시글만 삭제할 수 있습니다");
        }
        this.recruitService.delete(deleteRecruitRequestDto);

        const author = await this.recruitService.getAuthorByRecruitId(deleteRecruitRequestDto.getRecruitId());
        const recruitDetail = await this.recruitService.getOne(
            deleteRecruitRequestDto.getUserId(),
            deleteRecruitRequestDto.getRecruitId(),
        );
        const users = await this.recruitService.getUsersByRecruitId(deleteRecruitRequestDto.getRecruitId());
        const { title, hDong, startTime, pathLength } = recruitDetail;

        await firstValueFrom(
            this.httpService
                .post(`${process.env.NOTI_SERVER_API_URL}/job/recruit/delete`, {
                    recruitId: deleteRecruitRequestDto.getRecruitId(),
                    users,
                    author,
                    title,
                    hDong,
                    startTime,
                    pathLength,
                })
                .pipe(
                    catchError((error: AxiosError) => {
                        throw error;
                    }),
                ),
        );
        return ResponseEntity.OK();
    }

    @ApiOperation({ summary: "모집 참여", description: "모집글에 참여한다" })
    @Post("join")
    async register(@Body() joinRecruitRequestDto: JoinRecruitRequestDto) {
        if (!(await this.recruitService.isExistingRecruit(joinRecruitRequestDto.getRecruitId()))) {
            return ResponseEntity.NOT_FOUND("존재하지 않는 게시글입니다");
        }
        if (
            await this.recruitService.isAuthorOfRecruit(
                joinRecruitRequestDto.getRecruitId(),
                joinRecruitRequestDto.getUserId(),
            )
        ) {
            return ResponseEntity.LOCKED("자신의 게시글에 참가할 수 없습니다");
        }
        if (
            await this.recruitService.isParticipating(
                joinRecruitRequestDto.getRecruitId(),
                joinRecruitRequestDto.getUserId(),
            )
        ) {
            return ResponseEntity.LOCKED("이미 참여중인 게시글입니다");
        }
        if (!(await this.recruitService.isVacancy(joinRecruitRequestDto.getRecruitId()))) {
            return ResponseEntity.LOCKED("모집 상한에 도달했습니다");
        }
        this.recruitService.join(joinRecruitRequestDto);

        const author = await this.recruitService.getAuthorByRecruitId(joinRecruitRequestDto.getRecruitId());
        const recruitDetail = await this.recruitService.getOne(
            joinRecruitRequestDto.getUserId(),
            joinRecruitRequestDto.getRecruitId(),
        );
        const user = await this.recruitService.getUserByIdx(joinRecruitRequestDto.getUserId());
        const { email, userId } = user;
        const { title, hDong, startTime, pathLength } = recruitDetail;
        if (user) {
            await firstValueFrom(
                this.httpService
                    .post(`${process.env.NOTI_SERVER_API_URL}/job/join`, {
                        recruitId: joinRecruitRequestDto.getRecruitId(),
                        user: { email, id: userId },
                        author,
                        title,
                        hDong,
                        startTime,
                        pathLength,
                    })
                    .pipe(
                        catchError((error: AxiosError) => {
                            throw error;
                        }),
                    ),
            );
        }

        return ResponseEntity.CREATED();
    }

    @ApiOperation({ summary: "모집 참여 취소", description: "모집 참여를 취소한다" })
    @Delete(":id/join")
    async unregister(@Param() unjoinRecruitRequestDto: UnjoinRecruitRequestDto) {
        this.recruitService.unjoin(unjoinRecruitRequestDto);

        const recruitDetail = await this.recruitService.getOne(
            unjoinRecruitRequestDto.getUserId(),
            unjoinRecruitRequestDto.getRecruitId(),
        );
        const user = await this.recruitService.getUserByIdx(unjoinRecruitRequestDto.getUserId());
        const { email, userId } = user;
        const { title, hDong, startTime, pathLength } = recruitDetail;
        const author = await this.recruitService.getAuthorByRecruitId(unjoinRecruitRequestDto.getRecruitId());

        if (user) {
            await firstValueFrom(
                this.httpService
                    .post(`${process.env.NOTI_SERVER_API_URL}/job/join/delete`, {
                        recruitId: unjoinRecruitRequestDto.getRecruitId(),
                        user: { email, id: userId },
                        author,
                        title,
                        hDong,
                        startTime,
                        pathLength,
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
