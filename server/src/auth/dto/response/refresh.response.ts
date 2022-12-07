import { Expose, plainToInstance } from "class-transformer";

export class RefreshResponseDto {
    @Expose()
    private accessToken: string;

    @Expose()
    private userId: string;

    static from(data: { accessToken: string; userId: string }) {
        return plainToInstance(RefreshResponseDto, data, { excludeExtraneousValues: true });
    }
}
