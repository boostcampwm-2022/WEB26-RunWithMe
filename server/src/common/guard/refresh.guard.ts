import { Request } from "express";
import { Observable } from "rxjs";
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";

@Injectable()
export class RefreshGuard implements CanActivate {
    constructor(private authService: AuthService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return this.validateRequest(request);
    }

    private validateRequest(req: Request) {
        console.log(req.cookies);
        const jwtString = req.cookies["refreshToken"];
        this.authService.verifyRefreshToken(jwtString);
        return true;
    }
}
