import { Body, Controller, Get, Param, Post, Req, Res, UseGuards } from "@nestjs/common";
import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { LoginUserRequestDto } from "./dto/request/login-user.request";
import { AccessGuard } from "../common/guards/access.guard";
import { RefreshGuard } from "../common/guards/refresh.guard";
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { ResponseEntity } from "src/common/response/response.entity";
import { LoginUserResponseDto } from "./dto/response/login-user.response";
import { RefreshResponseDto } from "./dto/response/refresh.response";

@Controller("auth")
@ApiTags("인증/인가 관리")
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiOperation({ summary: "리프레쉬 토큰 재발급", description: "리프레쉬 토큰을 재발급 한다" })
    @UseGuards(RefreshGuard)
    @Get("/refresh")
    async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
        const jwtString = req["cookies"]["refreshToken"];
        const { userId } = this.authService.verifyRefreshToken(jwtString);
        const accessToken = await this.authService.getAccessToken(userId);
        const refreshToken = await this.authService.getRefreshToken(userId);
        const refreshResponseDto = RefreshResponseDto.from({ accessToken, userId });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 30,
        });

        return ResponseEntity.CREATED_WITH_DATA(refreshResponseDto);
    }

    @ApiOperation({ summary: "로그아웃", description: "로그아웃해서 리프레시 토큰을 만료시킨다" })
    @UseGuards(AccessGuard)
    @Get("/logout")
    async logoutUser(@Param("userId") userId: number, @Res({ passthrough: true }) res: Response) {
        this.authService.logoutUser(userId);
        res.cookie("refreshToken", {
            maxAge: 0,
        });

        return ResponseEntity.OK();
    }

    @ApiOperation({ summary: "로그인", description: "로그인해서 액세스 토큰과 리프레시 토큰을 발급받는다" })
    @ApiBody({
        type: LoginUserRequestDto,
        description: "아이디는 6자 이상 20자 이하의 영문과 숫자만 허용, 비밀번호는 10자 이상 100자 이하여야 한다.",
    })
    @ApiOkResponse({ description: "로그인 성공" })
    @Post("/login")
    async validateUser(@Body() loginUserDto: LoginUserRequestDto, @Res({ passthrough: true }) res: Response) {
        const data = await this.authService.validateUser(loginUserDto);
        const loginUserResponseDto = LoginUserResponseDto.from({
            accessToken: data.accessToken,
            userId: loginUserDto.getUserId(),
        });

        res.cookie("refreshToken", data.refreshToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 30,
        });

        return ResponseEntity.OK_WITH_DATA(loginUserResponseDto);
    }

    @ApiOperation({ summary: "로그인 여부 확인", description: "사용자의 로그인 여부를 반환한다." })
    @ApiOkResponse({ description: "로그인 여부" })
    @Get("/check")
    async checkUserLoggedIn(@Req() req: Request) {
        const refreshToken = req["cookies"]["refreshToken"];
        if (!refreshToken) {
            return ResponseEntity.OK_WITH_DATA({ isLoggedIn: false });
        }
        try {
            this.authService.verifyRefreshToken(refreshToken);
            return ResponseEntity.OK_WITH_DATA({ isLoggedIn: true });
        } catch (err) {
            return ResponseEntity.OK_WITH_DATA({ isLoggedIn: false });
        }
    }
}
