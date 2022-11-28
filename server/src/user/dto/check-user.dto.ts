import { IsValidId } from "src/common/decorators";

export class CheckUserDto {
    @IsValidId()
    private userId: string;

    getUserId() {
        return this.userId;
    }
}
