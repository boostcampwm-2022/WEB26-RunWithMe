import { Global, Module } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { CustomJwtService } from "./custom-jwt.service";

@Global()
@Module({
    imports: [JwtModule.register({})],
    providers: [CustomJwtService],
    exports: [CustomJwtService],
})
export class CustomJwtModule {}
