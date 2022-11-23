import { IsValidId } from "src/common/decorator";

export class CheckUserDto {
    @IsValidId()
    private userId: string;

    getUserId() {
        return this.userId;
    }
}
