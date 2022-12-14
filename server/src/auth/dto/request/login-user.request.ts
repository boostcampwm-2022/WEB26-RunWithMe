import { ApiProperty } from "@nestjs/swagger";
import { IsValidId, IsValidPassword } from "../../../common/decorators";

export class LoginUserRequestDto {
    @IsValidId()
    @ApiProperty({ type: String, description: "사용자 id" })
    private userId: string;

    @IsValidPassword()
    @ApiProperty({ type: String, description: "액세스 토큰" })
    private password: string;

    getUserId() {
        return this.userId;
    }

    getPassword() {
        return this.password;
    }
}
