import { CustomRepository } from "../typeorm/typeorm.decorator";
import { Recruit } from "../entities/recruit.entity";
import { Repository } from "typeorm";
import { RawRecruitData } from "../types/raw-recruit-data";

@CustomRepository(Recruit)
export class RecruitRepository extends Repository<Recruit> {
    async createOne(recruitEntity: Recruit): Promise<Recruit> {
        return this.save(recruitEntity);
    }

    async getAuthorByRecruitId(recruitId: number) {
        return this.createQueryBuilder("recruit")
            .innerJoinAndSelect("recruit.user", "user")
            .select(["user.email AS email", "user.userId AS id"])
            .where("recruit.id = :recruitId", { recruitId })
            .andWhere("user.receiveMail = true")
            .getRawOne();
    }

    async findRecruitDetail(recruitId: number) {
        return this.createQueryBuilder("recruit")
            .innerJoinAndSelect("recruit.course", "course")
            .innerJoinAndSelect("course.hCode", "h_dong")
            .leftJoinAndSelect("recruit.userRecruits", "user_recruit")
            .innerJoinAndSelect("recruit.user", "user")
            .select([
                "recruit.title AS title",
                "recruit.startTime AS startTime",
                "recruit.maxPpl AS maxPpl",
                "recruit.pace AS pace",
                "recruit.userId AS authorId",
                "recruit.startTime AS startTime",
                "user.userId AS userId",
                "COUNT(user_recruit.userId) AS currentPpl",
                "course.path AS path",
                "course.pathLength AS pathLength",
                "user.userId AS userId",
                "h_dong.name",
            ])
            .where("recruit.id = :recruitId", { recruitId })
            .orderBy("recruit.id", "DESC")
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
                "course.path",
                "course.pathLength",
                "h_dong.name",
                "course.createdAt",
                "u.userId AS course_userId",
            ])
            .groupBy("recruit.id")
            .offset((page - 1) * pageSize)
            .limit(pageSize)
            .orderBy("recruit.id", "DESC")
            .getRawMany();
    }

    async findOneById(id: number): Promise<Recruit> {
        return await this.findOneBy({ id });
    }

    async getMaxPpl(id: number) {
        return (await this.findOneById(id)).maxPpl;
    }
    async findManyByUser(userId: number): Promise<RawRecruitData[]> {
        return this.createQueryBuilder("recruit")
            .innerJoinAndSelect("recruit.course", "course")
            .innerJoinAndSelect("course.user", "u")
            .innerJoinAndSelect("course.hCode", "h_dong")
            .leftJoinAndSelect("recruit.userRecruits", "user_recruit")
            .innerJoinAndSelect("recruit.user", "user")
            .leftJoinAndSelect("recruit.userRecruits", "sb")
            .select([
                "recruit.id AS id",
                "recruit.title AS title",
                "recruit.startTime AS startTime",
                "recruit.maxPpl AS maxPpl",
                "recruit.pace AS pace",
                "recruit.createdAt AS createdAt",
                "user.userId AS userId",
                "course.id",
                "course.title",
                "course.path",
                "course.pathLength",
                "h_dong.name",
                "course.createdAt",
                "u.userId AS course_userId",
                "count(sb.id) as currentPpl",
            ])
            .where("sb.recruitId = recruit.id")
            .andWhere("user_recruit.userId = :userId", { userId })
            .groupBy("recruit.id")
            .getRawMany();
    }
}
