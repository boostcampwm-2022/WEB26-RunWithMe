import { Injectable } from "@nestjs/common";
import { RecruitRepository } from "./recruit.repository";
import { CreateRecruitDto } from "./dto/create-recruit.dto";
import { Recruit } from "src/entities/recruit.entity";

@Injectable()
export class RecruitService {
    constructor(private recruitRepository: RecruitRepository) {}

    async create(createRecruitDto: CreateRecruitDto): Promise<Recruit> {
        const recruitEntity = createRecruitDto.toEntity();
        return this.recruitRepository.createOne(recruitEntity);
    }

    async findAll(): Promise<Recruit[]> {
        return this.recruitRepository.findAll();
    }

    // Test 해봐야 함.
    async isAuthorOfRecruit(recruitId: number, userId: number) {
        const recruitEntity = await this.recruitRepository.findOneById(recruitId);
        return recruitEntity.userId === userId;
    }
}
