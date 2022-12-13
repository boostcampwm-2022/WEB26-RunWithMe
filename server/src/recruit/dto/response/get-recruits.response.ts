import { instanceToPlain, Expose, plainToInstance, Type } from "class-transformer";
import { GetCourseResponseDto } from "../../../course/dto/response/get-course.response";

export class GetRecruitsResponseDto {
    @Expose()
    id: number;

    @Expose()
    title: string;

    @Expose()
    startTime: Date;

    @Expose()
    maxPpl: number;

    @Expose()
    currentPpl: string;

    @Expose()
    userId: number;

    @Expose()
    createdAt: Date;

    @Expose()
    pace: number;

    @Expose()
    @Type(() => GetCourseResponseDto)
    course: GetCourseResponseDto;

    static fromEntity(recruit: any): GetRecruitsResponseDto {
        const data = instanceToPlain(recruit);
        return plainToInstance(GetRecruitsResponseDto, data, { excludeExtraneousValues: true });
    }
}
