import { IsValidId } from "../../../common/decorators";

export class CheckUserRequestDto {
    @IsValidId()
    private id: string;

    getUserId() {
        return this.id;
    }
}
