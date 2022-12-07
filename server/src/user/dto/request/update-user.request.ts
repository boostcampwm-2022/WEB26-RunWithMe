import { PartialType } from "@nestjs/swagger";
import { CreateUserRequestDto } from "./create-user.request";

export class UpdateUserDto extends PartialType(CreateUserRequestDto) {}
