import { instanceToPlain, plainToInstance, Expose, Type } from "class-transformer";

export class LatLng {
    @Expose()
    lat: number;

    @Expose()
    lng: number;
}

export class HDong {
    @Expose()
    name: string;
}

export class GetCourseResponseDto {
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

    static fromEntity(course: any) {
        const data = instanceToPlain(course);
        return plainToInstance(GetCourseResponseDto, data, { excludeExtraneousValues: true });
    }
}
