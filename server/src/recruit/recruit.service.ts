import { Injectable } from "@nestjs/common";
import { RecruitRepository } from "./recruit.repository";
import { CreateRecruitDto } from "./dto/create-recruit.dto";
import { Recruit } from "src/entities/recruit.entity";
import { UserRecruitRepository } from "src/user_recruit.repository";

@Injectable()
export class RecruitService {
    constructor(private recruitRepository: RecruitRepository, private userRecruitRepository: UserRecruitRepository) {}

    async create(createRecruitDto: CreateRecruitDto): Promise<Recruit> {
        const recruitEntity = createRecruitDto.toEntity();
        return this.recruitRepository.createOne(recruitEntity);
    }

    async findAll(): Promise<Recruit[]> {
        return this.recruitRepository.findAll();
    }

    async isExistRecruit(recruitId: number): Promise<number | null> {
        const recruitEntity = await this.recruitRepository.findOneById(recruitId);
        if (recruitEntity) {
            return recruitEntity.userId;
        }
        return null;
    }

    async isAuthorOfRecruit(recruitId: number, userId: number): Promise<boolean> {
        const author = await this.isExistRecruit(recruitId);
        return author === userId;
    }

    async isParticipaite(recruitId: number, userId: number): Promise<boolean> {
        return this.userRecruitRepository.isParticipate(recruitId, userId);
    }

    async isVacancy(recruitId: number): Promise<boolean> {
        const currentPpl = await this.userRecruitRepository.countCurrentPpl(recruitId);
        const maxPpl = await this.recruitRepository.getMaxPpl(recruitId);
        if (currentPpl < maxPpl) {
            return true;
        }
        return false;
    }
}
