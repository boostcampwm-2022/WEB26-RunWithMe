import { CustomRepository } from "src/common/typeorm/typeorm.decorator";
import { Recruit } from "src/entities/recruit.entity";
import { Repository } from "typeorm";
import { RawRecruitData } from "src/common/type/raw-recruit-data";
import { BadRequestException } from "@nestjs/common";
import { UserRecruitRepository } from "src/user_recruit.repository";

@CustomRepository(Recruit)
export class RecruitRepository extends Repository<Recruit> {
    async createOne(recruitEntity: Recruit): Promise<Recruit> {
        return this.save(recruitEntity);
    }
    async findRecruitDetail(recruitId: number) {
        await this.findOneById(recruitId);
        return this.createQueryBuilder("recruit")
            .innerJoinAndSelect("recruit.course", "course")
            .leftJoinAndSelect("recruit.userRecruits", "user_recruit")
            .innerJoinAndSelect("recruit.user", "user")
            .select([
                "recruit.title AS title",
                "recruit.startTime AS startTime",
                "recruit.name AS name",
                "recruit.maxPpl AS maxPpl",
                "recruit.pace AS pace",
                "recruit.userId AS authorId",
                "user.userId AS userId",
                "COUNT(user_recruit.userId) AS currentPpl",
                "course.path AS path",
                "course.pathLength AS pathLength",
                "user.userId AS userId",
            ])
            .where("recruit.id = :recruitId", { recruitId })
            .getRawOne();
    }

    async findAll(page: number, pageSize: number): Promise<RawRecruitData[]> {
        return this.createQueryBuilder("recruit")
            .innerJoinAndSelect("recruit.course", "course")
            .leftJoinAndSelect("recruit.userRecruits", "user_recruit")
            .innerJoinAndSelect("recruit.user", "user")
            .select([
                "recruit.id AS id",
                "recruit.title AS title",
                "recruit.startTime AS startTime",
                "recruit.maxPpl AS maxPpl",
                "recruit.createdAt AS createdAt",
                "user.userId AS userId",
                "COUNT(user_recruit.id) AS currentPpl",
                "user_recruit.id",
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

    async findOneById(id: number): Promise<Recruit> {
        const data = await this.findOneBy({ id });
        if (!data) {
            throw new BadRequestException();
        }
        return data;
    }

    async getMaxPpl(id: number) {
        return (await this.findOneById(id)).maxPpl;
    }
}
