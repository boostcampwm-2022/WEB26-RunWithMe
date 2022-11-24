import { CustomRepository } from "src/common/typeorm/typeorm.decorator";
import { Repository } from "typeorm";
import { Course } from "src/entities/course.entity";
import { CourseData } from "src/common/type/raw-course-data";

@CustomRepository(Course)
export class CourseRepository extends Repository<Course> {
    async createOne(courseEntity: Course): Promise<Course> {
        return this.save(courseEntity);
    }

    async findAll(
        page: number,
        pageSize: number,
        query?: string | undefined,
        title?: boolean | undefined,
        author?: boolean | undefined,
        minLen?: number | undefined,
        maxLen?: number | undefined,
    ): Promise<CourseData[]> {
        return this.createQueryBuilder("course")
            .innerJoinAndSelect("course.user", "user")
            .where("1=1")
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
                "course.id",
                "course.title",
                "course.img",
                "course.path",
                "course.pathLength",
                "course.hCode",
                "course.name",
                "course.createdAt",
                "user.userId",
            ])
            .offset((page - 1) * pageSize)
            .limit(pageSize)
            .getMany();
    }
}
