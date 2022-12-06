import { PartialType } from "@nestjs/swagger";
import { CreateUserDto } from "./create-user.request";

export class UpdateUserDto extends PartialType(CreateUserDto) {}
