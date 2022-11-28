import { IsValidId, IsValidPassword } from "src/common/decorators";

export class LoginUserDto {
    @IsValidId()
    private userId: string;

    @IsValidPassword()
    private password: string;

    getUserId() {
        return this.userId;
    }

    getPassword() {
        return this.password;
    }
}
