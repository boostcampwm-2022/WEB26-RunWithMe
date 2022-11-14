import { NestFactory } from "@nestjs/core";
import { PrismaService } from "./prisma/prisma.service";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const prismaService = app.get(PrismaService);
    const options = new DocumentBuilder()
        .setTitle("Nest example")
        .setDescription("API description")
        .setVersion("1.0")
        .addTag("app")
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup("api", app, document);

    await prismaService.enableShutdownHooks(app);
    await app.listen(3000);
}
bootstrap();
