import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class CustomJwtService {
    constructor(private jwtService: JwtService) {}

    async createAccessToken(userId: string, userIdx: number) {
        const token = this.jwtService.sign(
            { userId, userIdx },
            {
                secret: process.env.ACCESS_SECRET,
                expiresIn: "30d",
            },
        );
        return token;
    }

    async createRefreshToken(userId: string, userIdx: number) {
        const token = this.jwtService.sign(
            { userId, userIdx },
            {
                secret: process.env.REFRESH_SECRET,
                expiresIn: "30d",
            },
        );
        return token;
    }

    verifyRefreshToken(jwtString: string) {
        const payload = this.jwtService.verify(jwtString, { secret: process.env.REFRESH_SECRET });
        const { userId, userIdx } = payload;
        return { userId, userIdx };
    }

    verifyAccessToken(jwtString: string) {
        const payload = this.jwtService.verify(jwtString, { secret: process.env.ACCESS_SECRET });
        const { userId, userIdx } = payload;
        return { userId, userIdx };
    }
}
