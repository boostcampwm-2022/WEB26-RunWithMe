import { Injectable, UnauthorizedException } from "@nestjs/common";
import { LoginUserDto } from "./dto/login-user.dto";
import * as bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
import { UserRepository } from "src/common/repositories/user.repository";
import { AuthRepository } from "../common/repositories/auth.repository";

@Injectable()
export class AuthService {
    constructor(
        private userRepository: UserRepository,
        private jwtService: JwtService,
        private authRepository: AuthRepository,
    ) {}

    async validateUser(loginUserDto: LoginUserDto) {
        const userEntity = await this.userRepository.findOneByUserId(loginUserDto.getUserId());
        if (!userEntity || !bcrypt.compareSync(loginUserDto.getPassword(), userEntity.password)) {
            throw new UnauthorizedException();
        }
        const accessToken = await this.getAccessToken(userEntity.userId);
        const refreshToken = await this.getRefreshToken(userEntity.userId);
        return {
            accessToken,
            refreshToken,
            userIdx: userEntity.id,
        };
    }

    async logoutUser(userId: string) {
        this.authRepository.deleteToken(userId);
    }
    async getAccessToken(userId: string) {
        const token = this.jwtService.sign(
            { userId, userIdx: await this.userRepository.findUserIdxByUserId(userId) },
            {
                secret: process.env.ACCESS_SECRET,
                expiresIn: "15m",
            },
        );
        return token;
    }

    async getRefreshToken(userId: string) {
        const token = this.jwtService.sign(
            { userId, userIdx: await this.userRepository.findUserIdxByUserId(userId) },
            {
                secret: process.env.REFRESH_SECRET,
                expiresIn: "30d",
            },
        );
        this.authRepository.saveToken(token, userId);
        return token;
    }

    verifyRefreshToken(jwtString: string) {
        const payload = this.jwtService.verify(jwtString, { secret: process.env.REFRESH_SECRET });
        const { userId } = payload;
        const { userIdx } = payload;
        return { userId, userIdx };
    }

    verifyAccessToken(jwtString: string) {
        const payload = this.jwtService.verify(jwtString, { secret: process.env.ACCESS_SECRET });
        const { userId } = payload;
        const { userIdx } = payload;
        return { userId, userIdx };
    }
}
