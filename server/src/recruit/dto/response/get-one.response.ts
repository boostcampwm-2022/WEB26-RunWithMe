import { instanceToPlain, Expose, plainToInstance, Type } from "class-transformer";
import { CourseResponseDto } from "src/course/dto/response/get-one.response";

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

export class GetOneResponseDto {
    @Expose()
    title: string;

    @Expose()
    startTime: Date;

    @Expose()
    maxPpl: number;

    @Expose()
    currentPpl: number;

    @Expose()
    @Type(() => LatLng)
    path: LatLng[];

    @Expose()
    pathLength: number;

    @Expose()
    pace: number;

    @Expose()
    @Type(() => HDong)
    hDong: HDong;

    @Expose()
    userId: number;

    @Expose()
    isParticipating: boolean;

    @Expose()
    isAuthor: boolean;

    static fromEntity(recruit: any): GetOneResponseDto {
        const data = instanceToPlain(recruit);
        return plainToInstance(GetOneResponseDto, data, { excludeExtraneousValues: true });
    }
}
