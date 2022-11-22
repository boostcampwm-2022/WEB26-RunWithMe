import { CustomRepository } from "src/common/typeorm/typeorm.decorator";
import { Recruit } from "src/entities/recruit.entity";
import { Repository } from "typeorm";

@CustomRepository(Recruit)
export class RecruitRepository extends Repository<Recruit> {
    async createOne(recruitEntity: Recruit): Promise<Recruit> {
        return this.save(recruitEntity);
    }

    async findAll(): Promise<Recruit[]> {
        // TODO: 현재 참가자 수 & 페이지네이션 적용
        return this.find({
            relations: ["course"],
        });
    }

    async findOneById(recruitId: number): Promise<Recruit | undefined> {
        return await this.findOneBy({ id: recruitId });
    }

    async getMaxPpl(recruitId: number) {
        return (await this.findOneById(recruitId)).maxPpl;
    }
}
