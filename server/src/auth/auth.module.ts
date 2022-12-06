import { Module } from "@nestjs/common";
import { AuthRepository } from "../common/repositories/auth.repository";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { TypeOrmCustomModule } from "../common/typeorm/typeorm.module";
import { UserRepository } from "../common/repositories/user.repository";
import { CustomJwtModule } from "../common/modules/custom-jwt/custom-jwt.module";

@Module({
    imports: [TypeOrmCustomModule.forCustomRepository([UserRepository]), CustomJwtModule],
    providers: [AuthService, AuthRepository],
    controllers: [AuthController],
})
export class AuthModule {}
