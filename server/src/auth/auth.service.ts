import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { LoginDTO } from "./dto/loginDTO";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) {}

    async validateUser(loginDTO: LoginDTO) {
        const user = await this.userService.findByUserId(loginDTO.userId);
        if (!user || !bcrypt.compareSync(loginDTO.password, user.password)) {
            throw new UnauthorizedException();
        }
        return {
            accessToken: this.getAccessToken(user.userId),
            refreshToken: this.getRefreshToken(user.userId),
        };
    }

    getAccessToken(userId: string) {
        const token = this.jwtService.sign(
            { userId },
            {
                secret: process.env.ACCESS_SECRET,
                expiresIn: "15m",
            },
        );
        return token;
    }

    getRefreshToken(userId: string) {
        const token = this.jwtService.sign(
            { userId },
            {
                secret: process.env.REFRESH_SECRET,
                expiresIn: "24h",
            },
        );
        return token;
    }
}
