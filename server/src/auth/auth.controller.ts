import { Body, Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { LoginUserReqDto } from "./dto/request/login-user.request";
import { AccessGuard } from "../common/guards/access.guard";
import { RefreshGuard } from "../common/guards/refresh.guard";
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

@Controller("auth")
@ApiTags("인증/인가 관리")
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiOperation({ summary: "리프레쉬 토큰 재발급", description: "리프레쉬 토큰을 재발급 한다" })
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

    @ApiOperation({ summary: "로그아웃", description: "로그아웃해서 리프레시 토큰을 만료시킨다" })
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

    @ApiOperation({ summary: "로그인", description: "로그인해서 액세스 토큰과 리프레시 토큰을 발급받는다" })
    @ApiBody({
        type: LoginUserReqDto,
        description: "아이디는 6자 이상 20자 이하의 영문과 숫자만 허용, 비밀번호는 10자 이상 100자 이하여야 한다.",
    })
    @ApiOkResponse({ description: "로그인 성공" })
    @Post("/login")
    async validateUser(@Body() loginUserDto: LoginUserReqDto, @Res() res: Response) {
        console.log(loginUserDto);
        const data = await this.authService.validateUser(loginUserDto);
        res.cookie("refreshToken", data.refreshToken, {
            httpOnly: true,
        });
        res.send({
            statusCode: 200,
            data: {
                accessToken: data.accessToken,
                userId: loginUserDto.getUserId(),
            },
        });
    }

    @Get("/test")
    test() {
        return "hello";
    }
}
