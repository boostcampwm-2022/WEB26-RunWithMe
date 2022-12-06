import { Module } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { CustomJwtModule } from "../../modules/custom-jwt/custom-jwt.module";
import { HttpRequestBodyInterceptor } from "./http-request-body.interceptor";

@Module({
    imports: [CustomJwtModule],
    providers: [{ provide: APP_INTERCEPTOR, useClass: HttpRequestBodyInterceptor }],
})
export class HttpRequestBodyModule {}
