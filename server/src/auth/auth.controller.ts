import { Body, Controller, Post, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginUserDto } from "./dto/login-user.dto";
import { Response } from "express";
import { plainToClass } from "class-transformer";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post("/login")
    async validateUser(@Body() loginUserDto: LoginUserDto, @Res() res: Response) {
        loginUserDto = plainToClass(LoginUserDto, loginUserDto);

        const data = await this.authService.validateUser(loginUserDto);
        res.cookie("refreshToken", data.refreshToken, {
            httpOnly: true,
        });
        res.send({
            status: 200,
            data: {
                accessToken: data.accessToken,
                userId: loginUserDto.getUserId(),
            },
        });
    }
}
