import { instanceToPlain, Expose, plainToInstance } from "class-transformer";
import { Course } from "src/common/entities/course.entity";

export class CreateCourseResponseDto {
    @Expose({ name: "id" })
    private courseId: number;

    static fromEntity(course: Course): CreateCourseResponseDto {
        const data = instanceToPlain(course);
        return plainToInstance(CreateCourseResponseDto, data, { excludeExtraneousValues: true });
    }
}
