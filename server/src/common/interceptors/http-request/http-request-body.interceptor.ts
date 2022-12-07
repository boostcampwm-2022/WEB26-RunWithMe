import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { CustomJwtService } from "../../modules/custom-jwt/custom-jwt.service";

@Injectable()
export class HttpRequestBodyInterceptor implements NestInterceptor {
    constructor(private jwtService: CustomJwtService) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        let accessToken = request.headers["authorization"];

        if (accessToken) {
            try {
                accessToken = accessToken.split("Bearer")[1].trim();
                const { userIdx } = this.jwtService.verifyAccessToken(accessToken);
                if (request.method === "GET" || request.method === "DELETE") {
                    request.params.userId = userIdx;
                }
                if (request.method === "POST") {
                    request.body.userId = userIdx;
                }
            } catch (err) {}
        }

        return next.handle();
    }
}
