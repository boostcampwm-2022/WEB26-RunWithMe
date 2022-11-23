import { Type } from "class-transformer";
import { IsNumber, IsNumberString } from "class-validator";
import { IsValidId, IsValidPassword } from "src/common/decorator";
import { User } from "../../entities/user.entity";

export class CreateUserDto {
    @IsValidId()
    private userId: string;

    @IsValidPassword()
    private password: string;

    @Type(() => Number)
    @IsNumber()
    private pace: number;

    @IsNumberString()
    private hCode: string;

    getUserId() {
        return this.userId;
    }

    getPassword() {
        return this.password;
    }

    setPassword(hashedPassword: string) {
        this.password = hashedPassword;
    }

    toUserEntity() {
        return User.of(this.userId, this.password, this.pace, this.hCode);
    }
}
