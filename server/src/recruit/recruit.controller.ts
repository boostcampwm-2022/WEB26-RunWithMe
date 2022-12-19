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
import { UserService } from "src/user/user.service";

@Controller("recruit")
@ApiTags("모집글 관리")
export class RecruitController {
    constructor(
        private readonly recruitService: RecruitService,
        private httpService: HttpService,
        private userService: UserService,
    ) {}

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
        const recruitDetail = await this.recruitService.notiGetOne(createRecruitDto.getUserId(), recruitEntity.id);

        const { id: recruitId, userId: userIdx } = recruitEntity;
        const userId = await this.userService.getUserIdByUserIdx(userIdx);

        // 메시지 큐 만드는 요청
        await firstValueFrom(
            this.httpService
                .post(`${process.env.CHAT_SERVER_API_URL}/queue`, {
                    recruitId,
                    userId,
                })
                .pipe(
                    catchError((error: AxiosError) => {
                        throw error;
                    }),
                ),
        );

        if (recruitDetail.author) {
            await firstValueFrom(
                this.httpService
                    .post(`${process.env.NOTI_SERVER_API_URL}/job/recruit`, {
                        recruitId: recruitEntity.id,
                        ...recruitDetail,
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

        const recruitDetail = await this.recruitService.notiGetOne(
            deleteRecruitRequestDto.getUserId(),
            deleteRecruitRequestDto.getRecruitId(),
        );
        const users = await this.recruitService.getUsersByRecruitId(deleteRecruitRequestDto.getRecruitId());

        await firstValueFrom(
            this.httpService
                .post(`${process.env.CHAT_SERVER_API_URL}/queue/delete/many`, {
                    recruitId: deleteRecruitRequestDto.getRecruitId(),
                })
                .pipe(
                    catchError((error: AxiosError) => {
                        throw error;
                    }),
                ),
        );

        if (users.length) {
            await firstValueFrom(
                this.httpService
                    .post(`${process.env.NOTI_SERVER_API_URL}/job/recruit/delete`, {
                        recruitId: deleteRecruitRequestDto.getRecruitId(),
                        users,
                        ...recruitDetail,
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

        const recruitDetail = await this.recruitService.notiGetOne(
            joinRecruitRequestDto.getUserId(),
            joinRecruitRequestDto.getRecruitId(),
        );
        const user = await this.recruitService.getUserByIdx(joinRecruitRequestDto.getUserId());
        const { email, userId } = user;

        await firstValueFrom(
            this.httpService
                .post(`${process.env.CHAT_SERVER_API_URL}/queue`, {
                    recruitId: joinRecruitRequestDto.getRecruitId(),
                    userId,
                })
                .pipe(
                    catchError((error: AxiosError) => {
                        throw error;
                    }),
                ),
        );

        if (user) {
            await firstValueFrom(
                this.httpService
                    .post(`${process.env.NOTI_SERVER_API_URL}/job/join`, {
                        recruitId: joinRecruitRequestDto.getRecruitId(),
                        user: { email, id: userId },
                        ...recruitDetail,
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

        const recruitDetail = await this.recruitService.notiGetOne(
            unjoinRecruitRequestDto.getUserId(),
            unjoinRecruitRequestDto.getRecruitId(),
        );
        const user = await this.recruitService.getUserByIdx(unjoinRecruitRequestDto.getUserId());
        const { email, userId } = user;

        await firstValueFrom(
            this.httpService
                .post(`${process.env.CHAT_SERVER_API_URL}/queue/delete/one`, {
                    recruitId: unjoinRecruitRequestDto.getRecruitId(),
                    userId,
                })
                .pipe(
                    catchError((error: AxiosError) => {
                        throw error;
                    }),
                ),
        );

        if (user) {
            await firstValueFrom(
                this.httpService
                    .post(`${process.env.NOTI_SERVER_API_URL}/job/join/delete`, {
                        recruitId: unjoinRecruitRequestDto.getRecruitId(),
                        user: { email, id: userId },
                        ...recruitDetail,
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

        const userId = getRecruitRequestDto.getUserId();
        const recruitId = getRecruitRequestDto.getRecruitId();

        const recruitEntity = await this.recruitService.getOne(userId, recruitId);
        const userEntity = await this.recruitService.getUserByIdx(userId);
        const getRecruitResponseDto = GetRecruitResponseDto.fromEntity(recruitEntity);
        let pausedCount: number;

        try {
            const response = await firstValueFrom(
                this.httpService
                    .get(`${process.env.CHAT_SERVER_API_URL}/unread?userId=${userEntity.userId}&recruitId=${recruitId}`)
                    .pipe(
                        catchError((error: AxiosError) => {
                            throw error;
                        }),
                    ),
            );

            pausedCount = response.data.data.paused;
        } catch (err) {
            pausedCount = 0;
        }

        getRecruitResponseDto.setPaused(pausedCount);
        return ResponseEntity.OK_WITH_DATA(getRecruitResponseDto);
    }
}
