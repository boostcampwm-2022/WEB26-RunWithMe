import { instanceToPlain, Expose, plainToInstance, Type } from "class-transformer";

class HDong {
    @Expose()
    name: string;
}

export class GetProfileResponseDto {
    @Expose()
    userId: string;

    @Expose()
    @Type(() => HDong)
    hDong: HDong;

    @Expose()
    pace: number;

    static fromEntity(userData: any): GetProfileResponseDto {
        const data = instanceToPlain(userData);
        return plainToInstance(GetProfileResponseDto, data, { excludeExtraneousValues: true });
    }
}
