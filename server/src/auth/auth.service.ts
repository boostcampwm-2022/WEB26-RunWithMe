import { Injectable, UnauthorizedException } from "@nestjs/common";
import { LoginUserDto } from "./dto/login-user.dto";
import * as bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
import { UserRepository } from "src/user/user.repository";

@Injectable()
export class AuthService {
    constructor(private userRepository: UserRepository, private jwtService: JwtService) {}

    async validateUser(loginUserDto: LoginUserDto) {
        const userEntity = await this.userRepository.findByUserId(loginUserDto.getUserId());
        if (!userEntity || !bcrypt.compareSync(loginUserDto.getPassword(), userEntity.password)) {
            throw new UnauthorizedException();
        }
        return {
            accessToken: this.getAccessToken(userEntity.userId),
            refreshToken: this.getRefreshToken(userEntity.userId),
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
                expiresIn: "30d",
            },
        );
        return token;
    }
}
