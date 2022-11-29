import { Injectable } from "@nestjs/common";
import { RecruitRepository } from "../common/repositories/recruit.repository";
import { CreateRecruitDto } from "./dto/request/create-recruit.request";
import { GetRecruitDto } from "./dto/request/get-recruit.request";
import { Recruit } from "src/common/entities/recruit.entity";
import { UserRecruitRepository } from "src/common/repositories/user_recruit.repository";
import { plainToGetRecruitDto } from "src/common/utils/plainToGetRecruitDto";
import { CustomJwtService } from "src/common/modules/custom-jwt/custom-jwt.service";
import { DataSource, FindOneOptions, Repository } from "typeorm";
@Injectable()
export class RecruitService {
    constructor(
        private recruitRepository: RecruitRepository,
        private userRecruitRepository: UserRecruitRepository,
        private jwtService: CustomJwtService,
        private dataSource: DataSource,
    ) {}

    async create(createRecruitDto: CreateRecruitDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const recruitEntity = await this.recruitRepository.createOne(createRecruitDto.toEntity());
            this.userRecruitRepository.createUserRecruit(recruitEntity.userId, recruitEntity.id);
            return recruitEntity;
        } catch (error: any) {
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }
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

    async getOne(jwtString: string, recruitId: number) {
        const { userIdx } = this.jwtService.verifyAccessToken(jwtString);
        const data = await this.recruitRepository.findRecruitDetail(recruitId);
        return {
            ...data,
            isAuthor: data.authorId === userIdx,
            isParticipating: await this.isParticipating(recruitId, userIdx),
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

    join(userId: number, recruitId: number) {
        this.userRecruitRepository.createUserRecruit(userId, recruitId);
    }
}
