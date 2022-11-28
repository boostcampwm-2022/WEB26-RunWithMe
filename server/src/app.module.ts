import { CacheModule, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as redisStore from "cache-manager-ioredis";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { User } from "./entities/user.entity";
import { Course } from "./entities/course.entity";
import { Recruit } from "./entities/recruit.entity";
import { UserRecruit } from "./entities/user_recruit.entity";
import { HDong } from "./entities/h_dong.entity";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import type { ClientOpts } from "redis";
import { RecruitModule } from "./recruit/recruit.module";
import { CourseModule } from "./course/course.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRoot({
            type: "mysql",
            host: process.env.DB_HOST,
            port: process.env.DB_PORT as any,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            synchronize: true,
            logging: true,
            entities: [User, Course, Recruit, UserRecruit, HDong],
            poolSize: 10,
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
        UserModule,
        AuthModule,
        RecruitModule,
        CourseModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
