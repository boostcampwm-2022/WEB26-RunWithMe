import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserService } from "./user.service";
import { plainToClass } from "class-transformer";
import { CheckUserDto } from "./dto/check-user.dto";

@Controller("user")
export class UserController {
    constructor(private userService: UserService) {}

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        createUserDto = plainToClass(CreateUserDto, createUserDto);
        return this.userService.create(createUserDto);
    }

    @Get(":userId")
    async checkId(@Param() checkUserDto: CheckUserDto) {
        checkUserDto = plainToClass(CheckUserDto, checkUserDto);
        return this.userService.checkId(checkUserDto);
    }
}
