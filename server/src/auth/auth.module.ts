import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserService } from "src/user/user.service";
import { TypeOrmCustomModule } from "src/common/typeorm/typeorm.module";
import { UserRepository } from "src/common/repositories/user.repository";
import { AuthRepository } from "../common/repositories/auth.repository";
import { CustomJwtModule } from "src/common/modules/custom-jwt/custom-jwt.module";

@Module({
    imports: [TypeOrmCustomModule.forCustomRepository([UserRepository]), CustomJwtModule],
    providers: [AuthService, UserService, AuthRepository],
    controllers: [AuthController],
})
export class AuthModule {}
