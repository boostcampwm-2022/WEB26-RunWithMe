import { instanceToPlain, Expose, plainToInstance, Type } from "class-transformer";

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

export class GetRecruitResponseDto {
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

    @Expose()
    paused: number;

    setPaused(paused: number) {
        this.paused = paused;
    }

    static fromEntity(recruit: any): GetRecruitResponseDto {
        const data = instanceToPlain(recruit);
        return plainToInstance(GetRecruitResponseDto, data, { excludeExtraneousValues: true });
    }
}
