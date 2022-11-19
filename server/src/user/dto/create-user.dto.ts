import { IsString, MinLength } from "class-validator";
import { User } from "../../entities/user.entity";

export class CreateUserDto {
    @IsString()
    @MinLength(6)
    private userId: string;
    private password: string;
    private pace: number;
    private zipCode: string;

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
        return User.from(this.userId, this.password, this.pace, this.zipCode);
    }
}
