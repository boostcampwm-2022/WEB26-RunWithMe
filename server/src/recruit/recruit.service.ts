import { Injectable } from "@nestjs/common";
import { RecruitRepository } from "../common/repositories/recruit.repository";
import { CreateRecruitRequestDto } from "./dto/request/create-recruit.request";
import { GetRecruitsRequestDto } from "./dto/request/get-recruits.request";
import { UserRecruitRepository } from "../common/repositories/user_recruit.repository";
import { plainToGetRecruitDto } from "../common/utils/plainToGetRecruitDto";
import { DataSource, getConnection } from "typeorm";
import { plainToInstance } from "class-transformer";
import { JoinRecruitRequestDto } from "./dto/request/join-recruit.request";
import { Recruit } from "../common/entities/recruit.entity";
import { DeleteRecruitRequestDto } from "./dto/request/delete-recruit.request";
import { UserRecruit } from "src/common/entities/user_recruit.entity";
import { UnjoinRecruitRequestDto } from "./dto/request/unjoin-recruit.request";
import { UserRepository } from "src/common/repositories/user.repository";

@Injectable()
export class RecruitService {
    constructor(
        private recruitRepository: RecruitRepository,
        private userRecruitRepository: UserRecruitRepository,
        private userRepository: UserRepository,
        private dataSource: DataSource,
    ) {}

    async create(createRecruitRequestDto: CreateRecruitRequestDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        let recruitEntity: Recruit;

        await queryRunner.connect();
        await queryRunner.manager.transaction(async (manager) => {
            recruitEntity = await manager.save(createRecruitRequestDto.toEntity());
            const userRecruitDto = plainToInstance(JoinRecruitRequestDto, {
                userId: recruitEntity.userId,
                recruitId: recruitEntity.id,
            });
            await manager.save(userRecruitDto.toEntity());
        });
        return recruitEntity;
    }

    async delete(deleteRecruitRequestDto: DeleteRecruitRequestDto) {
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.manager.transaction(async (manager) => {
            const recruitEntity = await this.recruitRepository.findOneById(deleteRecruitRequestDto.getRecruitId());
            await manager.delete(UserRecruit, { recruitId: deleteRecruitRequestDto.getRecruitId() });
            await manager.remove(recruitEntity);
        });
    }
    async getMany(queryParams: GetRecruitsRequestDto) {
        if (queryParams.getQuery() === "") {
            return [];
        }

        if (!queryParams.getTitle() && !queryParams.getAuthor() && queryParams.getQuery()) {
            return [];
        }

        const recruitList = await this.recruitRepository.findAll(
            queryParams.getPage(),
            queryParams.getPageSize(),
            queryParams.getQuery(),
            queryParams.getTitle(),
            queryParams.getAuthor(),
            queryParams.getHour(),
            queryParams.getMinLength(),
            queryParams.getMaxLength(),
        );

        return recruitList
            .filter(({ currentPpl, maxPpl }) => {
                if (queryParams.getAvail()) {
                    if (parseInt(currentPpl) < maxPpl) {
                        return true;
                    }
                    return false;
                }
                return true;
            })
            .map(plainToGetRecruitDto);
    }

    async notiGetOne(userId: number, recruitId: number) {
        const data = await this.getOne(userId, recruitId);
        const { title, hDong, startTime, pathLength } = data;
        const author = await this.recruitRepository.getAuthorByRecruitId(recruitId);
        return { author, title, hDong, startTime, pathLength };
    }

    async getOne(_userId: number, recruitId: number) {
        const data = await this.recruitRepository.findRecruitDetail(recruitId);
        const { title, maxPpl, pace, userId, currentPpl, path, pathLength, startTime } = data;

        return {
            title,
            maxPpl,
            pace,
            userId,
            currentPpl,
            path: JSON.parse(path),
            pathLength,
            startTime,
            hDong: { name: data.h_dong_name },
            isAuthor: data.authorId === _userId,
            isParticipating: await this.isParticipating(recruitId, _userId),
        };
    }

    async isExistingRecruit(recruitId: number): Promise<boolean> {
        const recruitEntity = await this.recruitRepository.findOneById(recruitId);
        if (recruitEntity) {
            return true;
        }
        return false;
    }

    async isParticipating(recruitId: number, userId: number): Promise<boolean> {
        return await this.userRecruitRepository.isParticipating(recruitId, userId);
    }

    async isVacancy(recruitId: number): Promise<boolean> {
        const currentPpl = await this.getCurrentPpl(recruitId);
        const maxPpl = await this.recruitRepository.getMaxPpl(recruitId);
        if (currentPpl < maxPpl) {
            return true;
        }
        return false;
    }

    async getCurrentPpl(recruitId: number) {
        return await this.userRecruitRepository.countCurrentPpl(recruitId);
    }

    async isAuthorOfRecruit(recruitId: number, userId: number) {
        const recruitEntity = await this.recruitRepository.findOneById(recruitId);
        return recruitEntity.userId === userId;
    }

    join(joinRecruitRequestDto: JoinRecruitRequestDto) {
        this.userRecruitRepository.createUserRecruit(joinRecruitRequestDto.toEntity());
    }

    unjoin(unjoinRecruitRequestDto: UnjoinRecruitRequestDto) {
        this.userRecruitRepository.deleteUserRecruit(unjoinRecruitRequestDto.toEntity());
    }

    async getUsersByRecruitId(recruitId: number) {
        return this.userRecruitRepository.getUsersByRecruitId(recruitId);
    }

    async getUserByIdx(userId: number) {
        return this.userRepository.findOneByUserIdx(userId);
    }
}
