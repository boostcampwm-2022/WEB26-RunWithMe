import { Injectable } from "@nestjs/common";
import { RecruitRepository } from "../common/repositories/recruit.repository";
import { CreateRecruitReqDto } from "./dto/request/create.request";
import { GetRecruitDto } from "./dto/request/get-many.request";
import { UserRecruitRepository } from "src/common/repositories/user_recruit.repository";
import { plainToGetRecruitDto } from "src/common/utils/plainToGetRecruitDto";
import { CustomJwtService } from "src/common/modules/custom-jwt/custom-jwt.service";
import { DataSource } from "typeorm";
import { plainToInstance } from "class-transformer";
import { JoinRecruitDto } from "./dto/request/join-recruit.request";
import { Recruit } from "src/common/entities/recruit.entity";
@Injectable()
export class RecruitService {
    constructor(
        private recruitRepository: RecruitRepository,
        private userRecruitRepository: UserRecruitRepository,
        private dataSource: DataSource,
    ) {}

    async create(createRecruitDto: CreateRecruitReqDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        let recruitEntity: Recruit;

        await queryRunner.connect();
        await queryRunner.manager.transaction(async (manager) => {
            recruitEntity = await manager.save(createRecruitDto.toEntity());
            const userRecruitDto = plainToInstance(JoinRecruitDto, {
                userId: recruitEntity.userId,
                recruitId: recruitEntity.id,
            });
            await manager.save(userRecruitDto.toEntity());
        });
        return recruitEntity;
    }

    async getMany(queryParams: GetRecruitDto) {
        if (queryParams.getQuery() === "") {
            return [];
        }

        if (!queryParams.getTitle() && !queryParams.getAuthor()) {
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

    async getOne(userId: number, recruitId: number) {
        const data = await this.recruitRepository.findRecruitDetail(recruitId);
        return {
            ...data,
            path: JSON.parse(data.path),
            isAuthor: data.authorId === userId,
            isParticipating: await this.isParticipating(recruitId, userId),
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

    join(createUserRecruitDto: JoinRecruitDto) {
        this.userRecruitRepository.createUserRecruit(createUserRecruitDto.toEntity());
    }
}
