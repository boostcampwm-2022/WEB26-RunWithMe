import { Body, Controller, Post, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDTO } from "./dto/loginDTO";
import { Response } from "express";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post("/login")
    async validateUser(@Body() loginDTO: LoginDTO, @Res() res: Response) {
        try {
            const data = await this.authService.validateUser(loginDTO);
            res.cookie("refreshToken", data.refreshToken, {
                httpOnly: true,
            });
            res.send({
                status: 200,
                data: {
                    accessToken: data.accessToken,
                    userId: loginDTO.userId,
                },
            });
        } catch (error) {
            res.send({
                status: 401,
                error: {
                    message: "Your login request has failed",
                },
            });
        }
    }
}
