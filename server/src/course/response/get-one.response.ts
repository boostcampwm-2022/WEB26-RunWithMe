import { instanceToPlain, plainToInstance, Expose, Type } from "class-transformer";
import { Course } from "src/common/entities/course.entity";

class LatLng {
    @Expose()
    lat: number;

    @Expose()
    lng: number;
}

class HDong {
    @Expose()
    name: string;
}

export class CourseResponseDto {
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

    static fromEntity(course: Course) {
        const data = instanceToPlain(course);
        return plainToInstance(CourseResponseDto, data, { excludeExtraneousValues: true });
    }
}
