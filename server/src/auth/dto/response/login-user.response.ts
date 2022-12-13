import { Expose, plainToInstance } from "class-transformer";

export class LoginUserResponseDto {
    @Expose()
    private accessToken: string;

    @Expose()
    private userId: string;

    static from(data: { accessToken: string; userId: string }) {
        return plainToInstance(LoginUserResponseDto, data, { excludeExtraneousValues: true });
    }
}
