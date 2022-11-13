import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";

@Injectable()
export class AppService {
    constructor(private prismaService: PrismaService) {}

    async doTest() {
        return this.prismaService.user.create({
            data: {
                userId: "abcd1234",
                salt: "1",
                password: "1",
                zipCode: 123,
                pace: 123,
            },
        });
    }
}
