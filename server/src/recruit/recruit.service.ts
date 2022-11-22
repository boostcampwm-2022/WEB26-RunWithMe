import { Injectable } from "@nestjs/common";
import { RecruitRepository } from "./recruit.repository";
import { CreateRecruitDto } from "./dto/create-recruit.dto";

@Injectable()
export class RecruitService {
    constructor(private recruitRepository: RecruitRepository) {}

    async create(createRecruitDto: CreateRecruitDto) {
        const recruitEntity = createRecruitDto.toRecruitEntity();
        await this.recruitRepository.save(recruitEntity);
        return { statusCode: 201 };
    }
}
