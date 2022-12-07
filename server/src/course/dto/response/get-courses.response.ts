import { instanceToPlain, Expose, plainToInstance, Type } from "class-transformer";
import { HDong, LatLng } from "./get-course.response";

export class GetCoursesResponseDto {
    @Expose()
    id: number;

    @Expose()
    title: string;

    @Expose()
    @Type(() => LatLng)
    path: LatLng[];

    @Expose()
    pathLength: number;

    @Expose()
    userId: string;

    @Expose()
    @Type(() => HDong)
    hDong: HDong;

    @Expose()
    createdAt: Date;

    static fromEntity(course: any): GetCoursesResponseDto {
        const data = instanceToPlain(course);
        return plainToInstance(GetCoursesResponseDto, data, { excludeExtraneousValues: true });
    }
}
