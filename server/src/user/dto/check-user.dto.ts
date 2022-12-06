import { IsValidId } from "../../common/decorators";

export class CheckUserDto {
    @IsValidId()
    private userId: string;

    getUserId() {
        return this.userId;
    }
}
