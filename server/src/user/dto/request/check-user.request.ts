import { IsValidId } from "../../../common/decorators";

export class CheckUserDto {
    @IsValidId()
    private id: string;

    getUserId() {
        return this.id;
    }
}
