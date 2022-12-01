import { instanceToPlain, Expose, plainToInstance } from "class-transformer";
import { Course } from "src/common/entities/course.entity";

export class CreateResponseDto {
    @Expose({ name: "id" })
    private courseId: number;

    static fromEntity(course: Course): CreateResponseDto {
        const data = instanceToPlain(course);
        return plainToInstance(CreateResponseDto, data, { excludeExtraneousValues: true });
    }
}
