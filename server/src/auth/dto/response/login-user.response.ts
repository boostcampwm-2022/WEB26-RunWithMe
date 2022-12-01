import { ApiProperty } from "@nestjs/swagger";
import { IsValidPassword } from "src/common/decorators";

export class LoginUserResDto {
    @ApiProperty({ type: String, description: "사용자 id" })
    private userId: string;

    @IsValidPassword()
    @ApiProperty({ type: String, description: "비밀번호" })
    private password: string;
}
