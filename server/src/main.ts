import { NestFactory, Reflector } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import * as cookieParser from "cookie-parser";
import { ClassSerializerInterceptor, ValidationPipe } from "@nestjs/common";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const options = new DocumentBuilder()
        .setTitle("Nest example")
        .setDescription("API description")
        .setVersion("1.0")
        .addTag("app")
        .build();
    const document = SwaggerModule.createDocument(app, options);
    app.enableCors({ origin: true, methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS", credentials: true });
    app.use(cookieParser());
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
