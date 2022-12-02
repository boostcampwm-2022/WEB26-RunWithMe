import { instanceToPlain, Expose, plainToInstance, Type } from "class-transformer";
import { CourseResponseDto } from "src/course/dto/response/get-one.response";

export class GetManyResponseDto {
    @Expose()
    @Type(() => CourseResponseDto)
    course: CourseResponseDto;

    static fromEntity(course: any): GetManyResponseDto {
        const data = instanceToPlain(course);
        return plainToInstance(GetManyResponseDto, data, { excludeExtraneousValues: true });
        // return plainToInstance(GetManyResponseDto, course);
    }
}
