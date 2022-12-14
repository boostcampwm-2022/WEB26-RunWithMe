import { CacheModule, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as redisStore from "cache-manager-ioredis";
import { User } from "./common/entities/user.entity";
import { Course } from "./common/entities/course.entity";
import { Recruit } from "./common/entities/recruit.entity";
import { UserRecruit } from "./common/entities/user_recruit.entity";
import { HDong } from "./common/entities/h_dong.entity";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import type { ClientOpts } from "redis";
import { RecruitModule } from "./recruit/recruit.module";
import { CourseModule } from "./course/course.module";
import { CustomJwtModule } from "./common/modules/custom-jwt/custom-jwt.module";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { HttpRequestBodyInterceptor } from "./common/interceptors/http-request/http-request-body.interceptor";
import { HttpRequestBodyModule } from "./common/interceptors/http-request/http-request-body.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: process.env.NODE_ENV === "test" ? ".test.env" : ".env",
        }),
        TypeOrmModule.forRoot({
            type: "mysql",
            host: process.env.DB_HOST,
            port: process.env.DB_PORT as any,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            synchronize: true,
            dropSchema: process.env.NODE_ENV === "test" ? true : false,
            logging: process.env.NODE_ENV === "test" ? false : true,
            entities: [User, Course, Recruit, UserRecruit, HDong],
            poolSize: 100,
        }),
        CacheModule.register<ClientOpts>({
            isGlobal: true,
            store: redisStore,
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT,
            ttl: 0,
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, "..", "..", "client", "build"),
        }),
        HttpRequestBodyModule,
        CustomJwtModule,
        UserModule,
        AuthModule,
        RecruitModule,
        CourseModule,
    ],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useExisting: HttpRequestBodyInterceptor,
        },
        HttpRequestBodyInterceptor,
    ],
})
export class AppModule {}
