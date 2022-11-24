import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { CheckUserDto } from "./dto/check-user.dto";

@Controller("user")
export class UserController {
    constructor(private userService: UserService) {}

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        await this.userService.create(createUserDto);
        return { statusCode: 201 };
    }

    @Get(":userId")
    async checkId(@Param() checkUserDto: CheckUserDto) {
        return this.userService.checkId(checkUserDto);
    }
}
