import { Expose, plainToInstance } from "class-transformer";

export class CheckUserResponseDto {
    @Expose()
    private isExisting: boolean;

    static from(checkUser: { isExisting: boolean }): CheckUserResponseDto {
        return plainToInstance(CheckUserResponseDto, checkUser, { excludeExtraneousValues: true });
    }
}
