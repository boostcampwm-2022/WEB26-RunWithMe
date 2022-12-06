import { Test, TestingModule } from "@nestjs/testing";
import {
    INestApplication,
    ClassSerializerInterceptor,
    ValidationPipe,
    ExecutionContext,
    CallHandler,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import * as request from "supertest";
import * as cookieParser from "cookie-parser";
import { AppModule } from "./../src/app.module";
import { HttpRequestBodyInterceptor } from "../src/common/interceptors/http-request/http-request-body.interceptor";
import { DataSource } from "typeorm";
import { HDong } from "../src/common/entities/h_dong.entity";
import { query } from "./config/query";
import { Observable } from "rxjs";
import { CustomJwtService } from "../src/common/modules/custom-jwt/custom-jwt.service";
import { JwtService } from "@nestjs/jwt";

describe("AppController (e2e)", () => {
    let app: INestApplication;
    let dataSource: DataSource;
    let interceptor: HttpRequestBodyInterceptor;
    let customJwtService: CustomJwtService;
    let jwtService: JwtService;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.use(cookieParser());
        app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
        app.useGlobalPipes(
            new ValidationPipe({
                forbidUnknownValues: true,
                transform: true,
            }),
        );

        dataSource = moduleFixture.get(DataSource);
        interceptor = moduleFixture.get(HttpRequestBodyInterceptor);
        customJwtService = moduleFixture.get(CustomJwtService);
        jwtService = moduleFixture.get(JwtService);
        dataSource.getRepository(HDong).query(query);
        await app.init();
    });

    describe("UserController test", () => {
        describe("/user (POST): sign up", () => {
            it("sign up user with valid data", async () => {
                await request(app.getHttpServer())
                    .post("/user")
                    .send({ userId: "June1010", password: "1234567890", pace: 300, hCode: "1100000000" })
                    .expect(201); // Created
            });

            it("sign up user with duplicate userId", async () => {
                await request(app.getHttpServer())
                    .post("/user")
                    .send({ userId: "June1010", password: "1234567890", pace: 300, hCode: "1100000000" })
                    .expect(400); // Bad Request
            });

            it("sign up user with id including symbols, expecting validator exception", async () => {
                await request(app.getHttpServer())
                    .post("/user")
                    .send({ userId: "June10!!", password: "1234567890", pace: 300, hCode: "1100000000" })
                    .expect(400);
            });
        });

        describe("/user/:userId (GET): check duplicate userId", () => {
            it("check duplicate userId: June1010", async () => {
                await request(app.getHttpServer())
                    .get("/user/June1010")
                    .expect(200)
                    .then((res) => {
                        expect(res.body.statusCode).toEqual(200);
                        expect(res.body.exists).toEqual(true);
                    });
            });
        });
    });

    describe("CourseController test", () => {
        describe("/course (POST)", () => {
            it("create course with valid data", async () => {
                const mock = jest
                    .spyOn(interceptor, "intercept")
                    .mockImplementationOnce((ctxt: ExecutionContext, next: CallHandler): Observable<any> => {
                        const request = ctxt.switchToHttp().getRequest();
                        request.body.userId = 1; // June1010
                        return next.handle();
                    });

                const response = await request(app.getHttpServer())
                    .post("/course")
                    .send({
                        title: "test example",
                        path: [
                            { lat: 1, lng: 2 },
                            { lat: 2, lng: 3 },
                        ],
                        pathLength: 300,
                        hCode: "1100000000",
                    });

                expect(response.body.statusCode).toEqual(201);
                expect(response.body.data.courseId).toEqual(1);
                mock.mockRestore();
            });
        });

        describe("/course (GET)", () => {
            it("get course list w/o query and filter", async () => {
                const response = await request(app.getHttpServer()).get("/course").expect(200);

                expect(response.body.statusCode).toEqual(200);
                expect(response.body.data).toBeInstanceOf(Array);
                expect(response.body.data.length).toEqual(1);
                expect(response.body.data[0].id).toEqual(1);
                expect(response.body.data[0].title).toEqual("test example");
                expect(response.body.data[0].path).toEqual([
                    { lat: 1, lng: 2 },
                    { lat: 2, lng: 3 },
                ]);
                expect(response.body.data[0].pathLength).toEqual(300);
                expect(response.body.data[0].userId).toEqual("June1010");
                expect(response.body.data[0].hDong).toEqual({ name: "서울특별시" });
            });

            it("get course list with query='test example'", async () => {
                const response = await request(app.getHttpServer()).get("/course?query=test example").expect(200);

                expect(response.body.statusCode).toEqual(200);
                expect(response.body.data).toBeInstanceOf(Array);
                expect(response.body.data.length).toEqual(1);
                expect(response.body.data[0].id).toEqual(1);
                expect(response.body.data[0].title).toEqual("test example");
                expect(response.body.data[0].path).toEqual([
                    { lat: 1, lng: 2 },
                    { lat: 2, lng: 3 },
                ]);
                expect(response.body.data[0].pathLength).toEqual(300);
                expect(response.body.data[0].userId).toEqual("June1010");
                expect(response.body.data[0].hDong).toEqual({ name: "서울특별시" });
            });
        });

        describe("/course/:courseId (GET)", () => {
            it("get course detail", async () => {
                const response = await request(app.getHttpServer()).get("/course/1").expect(200);
                expect(response.body.statusCode).toEqual(200);
                expect(response.body.data).toBeInstanceOf(Object);
                expect(response.body.data.id).toEqual(1);
                expect(response.body.data.title).toEqual("test example");
                expect(response.body.data.path).toEqual([
                    { lat: 1, lng: 2 },
                    { lat: 2, lng: 3 },
                ]);
                expect(response.body.data.pathLength).toEqual(300);
                expect(response.body.data[0].userId).toEqual("June1010");
                expect(response.body.data.hDong).toEqual({ name: "서울특별시" });
            });
        });
    });

    describe("RecruitController test", () => {
        const startTime = new Date(2037, 11, 30).toISOString();

        describe("/recruit (POST)", () => {
            it("create recruit", async () => {
                const mock = jest
                    .spyOn(interceptor, "intercept")
                    .mockImplementationOnce((ctxt: ExecutionContext, next: CallHandler): Observable<any> => {
                        const request = ctxt.switchToHttp().getRequest();
                        request.body.userId = 1; // June1010
                        return next.handle();
                    });

                const response = await request(app.getHttpServer())
                    .post("/recruit")
                    .send({
                        title: "test example",
                        startTime,
                        maxPpl: 1,
                        pace: 300,
                        courseId: 1,
                    })
                    .expect(201);

                expect(response.body.statusCode).toEqual(201);
                expect(response.body.data.recruitId).toEqual(1);
                mock.mockRestore();
            });
        });

        describe("/recruit (GET)", () => {
            it("get recruit list", async () => {
                const response = await request(app.getHttpServer()).get("/recruit").expect(200);

                expect(response.body.statusCode).toEqual(200);
                expect(response.body.data).toBeInstanceOf(Array);
                expect(response.body.data.length).toEqual(1);
                expect(response.body.data[0].id).toEqual(1);
                expect(response.body.data[0].title).toEqual("test example");
                expect(response.body.data[0].startTime).toEqual("2037-12-29T15:00:00.000Z");
                expect(response.body.data[0].maxPpl).toEqual(1);
                expect(response.body.data[0].currentPpl).toEqual(1);
                expect(response.body.data[0].userId).toEqual("June1010");
                expect(response.body.data[0].pace).toEqual(300);
                expect(response.body.data[0].course.id).toEqual(1);
                expect(response.body.data[0].course.title).toEqual("test example");
                expect(response.body.data[0].course.path).toEqual([
                    { lat: 1, lng: 2 },
                    { lat: 2, lng: 3 },
                ]);
                expect(response.body.data[0].course.pathLength).toEqual(300);
                expect(response.body.data[0].course.userId).toEqual("June1010");
                expect(response.body.data[0].course.hDong).toEqual({ name: "서울특별시" });
            });
        });

        describe("/recruit/:recruitId (GET)", () => {
            it("get recruit detail", async () => {
                const mock = jest
                    .spyOn(interceptor, "intercept")
                    .mockImplementationOnce((ctxt: ExecutionContext, next: CallHandler): Observable<any> => {
                        const request = ctxt.switchToHttp().getRequest();
                        request.params.userId = 1; // June1010
                        return next.handle();
                    });

                const response = await request(app.getHttpServer()).get("/recruit/1").expect(200);
                expect(response.body.statusCode).toEqual(200);
                expect(response.body.data).toBeInstanceOf(Object);
                mock.mockRestore();
            });
        });

        describe("/recruit/join (POST)", () => {
            it("join not existing recruit", async () => {
                const mock = jest
                    .spyOn(interceptor, "intercept")
                    .mockImplementationOnce((ctxt: ExecutionContext, next: CallHandler): Observable<any> => {
                        const request = ctxt.switchToHttp().getRequest();
                        request.body.userId = 1; // June1010
                        return next.handle();
                    });

                const response = await request(app.getHttpServer())
                    .post("/recruit/join")
                    .send({ recruitId: 2 })
                    .expect(201);

                expect(response.body.statusCode).toEqual(404);
                expect(response.body.message).toEqual("존재하지 않는 게시글입니다");
                expect(response.body.error).toEqual("Not Found");
                mock.mockRestore();
            });

            it("join own recruit", async () => {
                const mock = jest
                    .spyOn(interceptor, "intercept")
                    .mockImplementationOnce((ctxt: ExecutionContext, next: CallHandler): Observable<any> => {
                        const request = ctxt.switchToHttp().getRequest();
                        request.body.userId = 1; // June1010
                        return next.handle();
                    });

                const response = await request(app.getHttpServer())
                    .post("/recruit/join")
                    .send({ recruitId: 1 })
                    .expect(201);

                expect(response.body.statusCode).toEqual(423);
                expect(response.body.message).toEqual("자신의 게시글에 참가할 수 없습니다");
                expect(response.body.error).toEqual("Locked");
                mock.mockRestore();
            });

            it("join max cap reached recruit", async () => {
                await request(app.getHttpServer())
                    .post("/user")
                    .send({ userId: "June1234", password: "1234567890", pace: 300, hCode: "1100000000" })
                    .expect(201); // Create another user

                const mock = jest
                    .spyOn(interceptor, "intercept")
                    .mockImplementation((ctxt: ExecutionContext, next: CallHandler): Observable<any> => {
                        const request = ctxt.switchToHttp().getRequest();
                        request.body.userId = 2;

                        return next.handle();
                    });

                let response = await request(app.getHttpServer())
                    .post("/recruit/join")
                    .send({ recruitId: 1 })
                    .expect(201);

                response = await request(app.getHttpServer()).post("/recruit/join").send({ recruitId: 1 }).expect(201);

                expect(response.body.statusCode).toEqual(423);
                expect(response.body.message).toEqual("모집 상한에 도달했습니다");
                expect(response.body.error).toEqual("Locked");
                mock.mockRestore();
            });

            it("join same recruit twice", async () => {
                let mock = jest
                    .spyOn(interceptor, "intercept")
                    .mockImplementationOnce((ctxt: ExecutionContext, next: CallHandler): Observable<any> => {
                        const request = ctxt.switchToHttp().getRequest();
                        request.body.userId = 1; // June1010
                        return next.handle();
                    });

                await request(app.getHttpServer())
                    .post("/recruit")
                    .send({
                        title: "test example",
                        startTime,
                        maxPpl: 5,
                        pace: 300,
                        courseId: 1,
                    })
                    .expect(201);

                mock = jest
                    .spyOn(interceptor, "intercept")
                    .mockImplementation((ctxt: ExecutionContext, next: CallHandler): Observable<any> => {
                        const request = ctxt.switchToHttp().getRequest();
                        request.body.userId = 2; // June1010
                        return next.handle();
                    });

                let response = await request(app.getHttpServer())
                    .post("/recruit/join")
                    .send({ recruitId: 2 })
                    .expect(201);

                response = await request(app.getHttpServer()).post("/recruit/join").send({ recruitId: 2 }).expect(201);
                expect(response.body.statusCode).toEqual(423);
                expect(response.body.message).toEqual("이미 참여중인 게시글입니다");
                expect(response.body.error).toEqual("Locked");
                mock.mockRestore();
            });
        });
    });

    describe("AuthController test", () => {
        describe("/auth/login (POST)", () => {
            it("sign in", async () => {
                const response = await request(app.getHttpServer())
                    .post("/auth/login")
                    .send({ userId: "June1010", password: "1234567890" })
                    .expect(201);

                expect(response.body.statusCode).toEqual(200);
            });
        });

        describe("/auth/logout (GET)", () => {
            it("sign out", async () => {
                const mock = jest
                    .spyOn(customJwtService, "createAccessToken")
                    .mockImplementationOnce((userId: string, userIdx: number) =>
                        Promise.resolve(jwtService.sign({ userId, userIdx }, { secret: process.env.ACCESS_SECRET })),
                    );

                const jwt = await customJwtService.createAccessToken("June1010", 1);

                const response = await request(app.getHttpServer())
                    .get("/auth/logout")
                    .set("Authorization", `Bearer ${jwt}`)
                    .expect(200);

                expect(response.body.statusCode).toEqual(200);
                mock.mockRestore();
            });
        });

        describe("/auth/refresh (GET)", () => {
            it("refresh token", async () => {
                const mock = jest
                    .spyOn(customJwtService, "createRefreshToken")
                    .mockImplementationOnce((userId: string, userIdx: number) =>
                        Promise.resolve(jwtService.sign({ userId, userIdx }, { secret: process.env.REFRESH_SECRET })),
                    );

                const jwt = await customJwtService.createRefreshToken("June1010", 1);

                const response = await request(app.getHttpServer())
                    .get("/auth/refresh")
                    .set("Cookie", [`refreshToken=${jwt};`])
                    .expect(200);

                expect(mock).toBeCalledTimes(2);
                expect(mock).toBeCalledWith("June1010", 1);
                expect(response.body.statusCode).toEqual(200);
                mock.mockRestore();
            });
        });
    });

    afterAll(async () => {
        await dataSource.dropDatabase();
        await app.close();
    });
});
