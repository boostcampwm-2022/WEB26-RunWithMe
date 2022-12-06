import { instanceToPlain, Expose, plainToInstance, Type } from "class-transformer";
import { CourseResponseDto } from "../../../course/dto/response/get-one.response";

export class GetManyResponseDto {
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
    @Type(() => CourseResponseDto)
    course: CourseResponseDto;

    static fromEntity(recruit: any): GetManyResponseDto {
        const data = instanceToPlain(recruit);
        return plainToInstance(GetManyResponseDto, data, { excludeExtraneousValues: true });
    }
}
