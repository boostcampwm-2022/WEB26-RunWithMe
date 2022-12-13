import { Type } from "class-transformer";
import { IsBoolean, IsEmail, IsNumber, IsNumberString } from "class-validator";
import { IsValidId, IsValidPassword } from "../../../common/decorators";
import { User } from "../../../common/entities/user.entity";

export class CreateUserRequestDto {
    @IsValidId()
    private userId: string;

    @IsValidPassword()
    private password: string;

    @Type(() => Number)
    @IsNumber()
    private pace: number;

    @IsNumberString()
    private hCode: string;

    @IsEmail()
    private email: string;

    @IsBoolean()
    private receiveMail: boolean;

    getUserId() {
        return this.userId;
    }

    getPassword() {
        return this.password;
    }

    getEmail() {
        return this.email;
    }

    getReceiveMail() {
        return this.receiveMail;
    }

    setPassword(hashedPassword: string) {
        this.password = hashedPassword;
    }

    toUserEntity() {
        return User.of(this.userId, this.password, this.pace, this.hCode, this.email, this.receiveMail);
    }
}
