import { Injectable } from "@nestjs/common";
import { RecruitRepository } from "./recruit.repository";
import { CreateRecruitDto } from "./dto/create-recruit.dto";
import { GetRecruitDto } from "./dto/get-recruit.dto";
import { Recruit } from "src/entities/recruit.entity";
import { UserRecruitRepository } from "src/user_recruit.repository";
import { HDongRepository } from "src/common/repository/h_dong.repository";
import { plainToGetRecruitDto } from "src/common/utils/plainToGetRecruitDto";
@Injectable()
export class RecruitService {
    constructor(
        private recruitRepository: RecruitRepository,
        private hDongRepository: HDongRepository,
        private userRecruitRepository: UserRecruitRepository,
    ) {}

    async create(createRecruitDto: CreateRecruitDto): Promise<Recruit> {
        const code = createRecruitDto.getHCode();
        const { name } = await this.hDongRepository.findOneBy({ code });
        createRecruitDto.setHCodeToName(name);
        const recruitEntity = createRecruitDto.toEntity();
        return this.recruitRepository.createOne(recruitEntity);
    }

    async getRecruitList(queryParams: GetRecruitDto) {
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
            queryParams.getTime(),
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
    
    async getRecruitDetail(recruitId: number) {
        return await this.recruitRepository.findRecruitDetail(recruitId);
    }

    async isExistRecruit(recruitId: number): Promise<number | null> {
        const recruitEntity = await this.recruitRepository.findOneById(recruitId);
        if (recruitEntity) {
            return recruitEntity.userId;
        }
        return null;
    }

    async isParticipating(recruitId: number, userId: number): Promise<boolean> {
        return this.userRecruitRepository.isParticipate(recruitId, userId);
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
