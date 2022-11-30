import { Injectable, UnauthorizedException } from "@nestjs/common";
import { LoginUserDto } from "./dto/login-user.dto";
import * as bcrypt from "bcryptjs";
import { UserRepository } from "src/common/repositories/user.repository";
import { AuthRepository } from "../common/repositories/auth.repository";
import { CustomJwtService } from "src/common/modules/custom-jwt/custom-jwt.service";

@Injectable()
export class AuthService {
    constructor(
        private jwtService: CustomJwtService,
        private userRepository: UserRepository,
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
        const userIdx = await this.userRepository.findUserIdxByUserId(userId);
        const token = await this.jwtService.createAccessToken(userId, userIdx);
        return token;
    }

    async getRefreshToken(userId: string) {
        const userIdx = await this.userRepository.findUserIdxByUserId(userId);
        const token = await this.jwtService.createRefreshToken(userId, userIdx);
        this.authRepository.saveToken(token, userId);
        return token;
    }

    verifyRefreshToken(jwtString: string) {
        const payload = this.jwtService.verifyRefreshToken(jwtString);
        return payload;
    }

    verifyAccessToken(jwtString: string) {
        const payload = this.jwtService.verifyAccessToken(jwtString);
        return payload;
    }
}
