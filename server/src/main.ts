import { NestFactory, Reflector } from "@nestjs/core";
import { ClassSerializerInterceptor, ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import * as cookieParser from "cookie-parser";
import * as compression from "compression";
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const options = new DocumentBuilder()
        .setTitle("RunWithMe API 명세")
        .setDescription("API description")
        .setVersion("1.0")
        .addTag("")
        .addBearerAuth(
            {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
                name: "JWT",
                in: "header",
            },
            "Authorization",
        )
        .build();
    const document = SwaggerModule.createDocument(app, options);
    app.enableCors({
        origin: "http://localhost:3000",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
        credentials: true,
    });
    app.setGlobalPrefix("/api");
    app.use(compression());
    app.use(cookieParser());
    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
    app.useGlobalPipes(
        new ValidationPipe({
            forbidUnknownValues: true,
            transform: true,
        }),
    );
    SwaggerModule.setup("api", app, document);

    await app.listen(4000);
}
bootstrap();
