import { CustomRepository } from "src/common/typeorm/typeorm.decorator";
import { Recruit } from "src/entities/recruit.entity";
import { Repository } from "typeorm";
import { RawRecruitData } from "src/common/type/raw-recruit-data";

@CustomRepository(Recruit)
export class RecruitRepository extends Repository<Recruit> {
    async createOne(recruitEntity: Recruit): Promise<Recruit> {
        return this.save(recruitEntity);
    }

    async findAll(page: number, pageSize: number): Promise<RawRecruitData[]> {
        return this.createQueryBuilder("recruit")
            .innerJoinAndSelect("recruit.course", "course")
            .leftJoinAndSelect("recruit.userRecruits", "user_recruit")
            .select([
                "recruit.id AS id",
                "recruit.title AS title",
                "recruit.startTime AS startTime",
                "recruit.maxPpl AS maxPpl",
                "COUNT(user_recruit.id) AS currentPpl",
                "course.id",
                "course.title",
                "course.img",
                "course.path",
                "course.pathLength",
                "course.hCode",
                "course.createdAt",
            ])
            .groupBy("recruit.id")
            .offset((page - 1) * pageSize)
            .limit(pageSize)
            .getRawMany();
    }

    async findOneById(recruitId: number): Promise<Recruit> {
        return this.findOneById(recruitId);
    }

    async getMaxPpl(recruitId: number) {
        return (await this.findOneById(recruitId)).maxPpl;
    }
}
