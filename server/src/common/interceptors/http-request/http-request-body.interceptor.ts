import { CallHandler, ExecutionContext, Injectable, NestInterceptor, RequestTimeoutException } from "@nestjs/common";
import { Observable } from "rxjs";
import { CustomJwtService } from "src/common/modules/custom-jwt/custom-jwt.service";

@Injectable()
export class HttpRequestBodyInterceptor implements NestInterceptor {
    constructor(private jwtService: CustomJwtService) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const accessToken = request.headers["authorization"];

        if (accessToken) {
            try {
                const { userIdx } = this.jwtService.verifyAccessToken(accessToken);
                if (request.method === "GET") {
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
