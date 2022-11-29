import { CustomRepository } from "src/common/typeorm/typeorm.decorator";
import { Recruit } from "src/common/entities/recruit.entity";
import { Repository } from "typeorm";
import { RawRecruitData } from "src/common/types/raw-recruit-data";
import { BadRequestException } from "@nestjs/common";

@CustomRepository(Recruit)
export class RecruitRepository extends Repository<Recruit> {
    async createOne(recruitEntity: Recruit): Promise<Recruit> {
        return this.save(recruitEntity);
    }

    async findRecruitDetail(recruitId: number) {
        return this.createQueryBuilder("recruit")
            .innerJoinAndSelect("recruit.course", "course")
            .innerJoinAndSelect("course.hCode", "h_dong")
            .leftJoinAndSelect("recruit.userRecruits", "user_recruit")
            .innerJoinAndSelect("recruit.user", "user")
            .select([
                "recruit.title AS title",
                "recruit.maxPpl AS maxPpl",
                "recruit.pace AS pace",
                "recruit.userId AS authorId",
                "user.userId AS userId",
                "COUNT(user_recruit.userId) AS currentPpl",
                "course.path AS path",
                "course.pathLength AS pathLength",
                "user.userId AS userId",
                "h_dong.name",
            ])
            .where("recruit.id = :recruitId", { recruitId })
            .getRawOne();
    }

    async findAll(
        page: number,
        pageSize: number,
        query?: string | undefined,
        title?: boolean | undefined,
        author?: boolean | undefined,
        hour?: number | undefined,
        minLen?: number | undefined,
        maxLen?: number | undefined,
    ): Promise<RawRecruitData[]> {
        return this.createQueryBuilder("recruit")
            .innerJoinAndSelect("recruit.course", "course")
            .innerJoinAndSelect("course.user", "u")
            .innerJoinAndSelect("course.hCode", "h_dong")
            .leftJoinAndSelect("recruit.userRecruits", "user_recruit")
            .innerJoinAndSelect("recruit.user", "user")
            .where("recruit.startTime > NOW()")
            .andWhere(hour ? `recruit.startTime < DATE_ADD(NOW(), INTERVAL :hour HOUR)` : "1=1", { hour })
            .andWhere(maxLen && minLen >= 0 ? `course.pathLength >= :minLen and course.pathLength < :maxLen` : "1=1", {
                minLen,
                maxLen,
            })
            .andWhere(query && title && author ? `(recruit.title LIKE :query_title or user.userId = :query)` : "1=1", {
                query_title: "%" + query + "%",
                query,
            })
            .andWhere(query && title && author === false ? `recruit.title LIKE :query_title` : "1=1", {
                query_title: "%" + query + "%",
            })
            .andWhere(query && title === false && author ? `user.userId = :query` : "1=1", {
                query,
            })
            .select([
                "recruit.id AS id",
                "recruit.title AS title",
                "recruit.startTime AS startTime",
                "recruit.maxPpl AS maxPpl",
                "recruit.pace AS pace",
                "recruit.createdAt AS createdAt",
                "user.userId AS userId",
                "COUNT(user_recruit.id) AS currentPpl",
                "course.id",
                "course.title",
                "course.img",
                "course.path",
                "course.pathLength",
                "h_dong.name",
                "course.createdAt",
                "u.userId AS course_userId",
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
