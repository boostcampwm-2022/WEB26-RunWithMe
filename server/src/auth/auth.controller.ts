import { Body, Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { LoginUserDto } from "./dto/login-user.dto";
import { plainToClass } from "class-transformer";
import { AccessGuard } from "src/common/guard/access.guard";
import { RefreshGuard } from "src/common/guard/refresh.guard";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(RefreshGuard)
    @Get("/refresh")
    async refresh(@Req() req: Request, @Res() res: Response) {
        const jwtString = req["cookies"]["refreshToken"];
        const { userId } = this.authService.verifyRefreshToken(jwtString);
        const { userIdx } = this.authService.verifyRefreshToken(jwtString);
        const accessToken = await this.authService.getAccessToken(userId);
        const refreshToken = await this.authService.getRefreshToken(userId);

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 30,
        });
        res.send({
            statusCode: 200,
            data: {
                accessToken: accessToken,
                userId,
                userIdx,
            },
        });
    }

    @UseGuards(AccessGuard)
    @Get("/logout")
    async logoutUser(@Req() req: Request, @Res() res: Response) {
        const jwtString = req.headers["authorization"].split("Bearer")[1].trim();
        const { userId } = this.authService.verifyAccessToken(jwtString);
        this.authService.logoutUser(userId);
        res.cookie("refreshToken", {
            maxAge: 0,
        });
        res.send({
            statusCode: 200,
        });
    }

    @Post("/login")
    async validateUser(@Body() loginUserDto: LoginUserDto, @Res() res: Response) {
        loginUserDto = plainToClass(LoginUserDto, loginUserDto);

        const data = await this.authService.validateUser(loginUserDto);
        res.cookie("refreshToken", data.refreshToken, {
            httpOnly: true,
        });
        res.send({
            statusCode: 200,
            data: {
                accessToken: data.accessToken,
                userId: loginUserDto.getUserId(),
                userIdx: data.userIdx,
            },
        });
    }
}
