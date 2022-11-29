import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { CheckUserDto } from "./dto/check-user.dto";
import { ResponseEntity } from "src/common/response/response.entity";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@Controller("user")
@ApiTags("사용자 관리")
export class UserController {
    constructor(private userService: UserService) {}

    @ApiOperation({ summary: "유저 회원가입", description: "회원가입한다" })
    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        await this.userService.create(createUserDto);
        return ResponseEntity.OK();
    }

    @ApiOperation({ summary: "중복 아이디 확인", description: "파라미터로 넘긴 id가 이미 가입되어 있는지 확인한다" })
    @Get(":userId")
    async checkId(@Param() checkUserDto: CheckUserDto) {
        return this.userService.checkId(checkUserDto);
    }
}
