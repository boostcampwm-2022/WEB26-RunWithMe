import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { ResponseEntity } from "../common/response/response.entity";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "./dto/request/create-user.request";
import { CheckUserDto } from "./dto/request/check-user.request";
import { CheckUserResponseDto } from "./dto/response/check-user.response";

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
    @Get(":id")
    async checkId(@Param() checkUserDto: CheckUserDto) {
        const data = await this.userService.checkId(checkUserDto);
        const checkUserResponseDto = CheckUserResponseDto.from(data);
        return ResponseEntity.OK_WITH_DATA(checkUserResponseDto);
    }
}
