import { Body, Controller, Post } from "@nestjs/common";
import { UserDTO } from "./dto/userDTO";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
    constructor(private userService: UserService) {}

    @Post()
    async create(@Body() userDTO: UserDTO) {
        return this.userService.create(userDTO);
    }
}
