import { Request } from "express";
import { Observable } from "rxjs";
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { CustomJwtService } from "../modules/custom-jwt/custom-jwt.service";

@Injectable()
export class RefreshGuard implements CanActivate {
    constructor(private jwtService: CustomJwtService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return this.validateRequest(request);
    }

    private validateRequest(req: Request) {
        const jwtString = req.cookies["refreshToken"];
        if (!jwtString) {
            return false;
        }
        this.jwtService.verifyRefreshToken(jwtString);
        return true;
    }
}
