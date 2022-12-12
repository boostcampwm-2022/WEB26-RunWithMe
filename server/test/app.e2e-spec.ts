import { Test, TestingModule } from "@nestjs/testing";
import {
    INestApplication,
    ClassSerializerInterceptor,
    ValidationPipe,
    ExecutionContext,
    CallHandler,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AxiosResponse } from "axios";
import * as request from "supertest";
import * as cookieParser from "cookie-parser";
import { AppModule } from "./../src/app.module";
import { HttpRequestBodyInterceptor } from "../src/common/interceptors/http-request/http-request-body.interceptor";
import { DataSource } from "typeorm";
import { HDong } from "../src/common/entities/h_dong.entity";
import { query } from "./config/query";
import { Observable, of } from "rxjs";
import { CustomJwtService } from "../src/common/modules/custom-jwt/custom-jwt.service";
import { JwtService } from "@nestjs/jwt";
import { HttpService } from "@nestjs/axios";
import { mockAxiosResponse, mockCourse, mockRecruit, mockUserNoEmail } from "./data/mockData";
import { expectedCourseData, expectedRecruitData } from "./data/expectedData";
import { requestRecruitMockData } from "./data/requestData";

describe("AppController (e2e)", () => {
    let app: INestApplication;
    let dataSource: DataSource;
    let interceptor: HttpRequestBodyInterceptor;
    let customJwtService: CustomJwtService;
    let jwtService: JwtService;
    let httpService: HttpService;
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
        httpService = moduleFixture.get(HttpService);
        await app.init();
    });

    const mockInterceptor = (userId: number, type: string) => {
        return jest
            .spyOn(interceptor, "intercept")
            .mockImplementation((ctxt: ExecutionContext, next: CallHandler): Observable<any> => {
                const request = ctxt.switchToHttp().getRequest();
                if (type === "get" || type === "delete") request.params.userId = userId;
                else request.body.userId = userId;
                return next.handle();
            });
    };
    const mockInterceptorOnce = (userId: number, type: string) => {
        return jest
            .spyOn(interceptor, "intercept")
            .mockImplementationOnce((ctxt: ExecutionContext, next: CallHandler): Observable<any> => {
                const request = ctxt.switchToHttp().getRequest();
                if (type === "get" || type === "delete") request.params.userId = userId;
                else request.body.userId = userId;
                return next.handle();
            });
    };
    const arr = Array.from(Array(15).keys());

    describe("UserController test", () => {
        describe("/user (POST): sign up", () => {
            it("sign up user with valid data", async () => {
                await request(app.getHttpServer()).post("/user").send(mockUserNoEmail("June1010")).expect(201); // Created
            });

            it("sign up user with duplicate userId", async () => {
                await request(app.getHttpServer()).post("/user").send(mockUserNoEmail("June1010")).expect(400); // Bad Request
            });

            it("sign up user with id including symbols, expecting validator exception", async () => {
                await request(app.getHttpServer()).post("/user").send(mockUserNoEmail("June1010")).expect(400);
            });
        });

        describe("/user/:userId (GET): check duplicate userId", () => {
            it("check duplicate userId: June1010", async () => {
                await request(app.getHttpServer())
                    .get("/user/June1010")
                    .expect(200)
                    .then((res) => {
                        expect(res.body.statusCode).toEqual(200);
                        expect(res.body.data.isExisting).toEqual(true);
                    });
            });
        });
    });

    describe("CourseController test", () => {
        describe("/course (POST)", () => {
            it("create course with valid data", async () => {
                const mock = mockInterceptorOnce(1, "post");
                const response = await request(app.getHttpServer()).post("/course").send(mockCourse("test example"));
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
                const { createdAt, ...responseCourseData } = response.body.data[0];
                expect(responseCourseData).toEqual(expectedCourseData);
            });

            it("get course list with query='test example'", async () => {
                const response = await request(app.getHttpServer()).get("/course?query=test example").expect(200);
                expect(response.body.statusCode).toEqual(200);
                expect(response.body.data).toBeInstanceOf(Array);
                expect(response.body.data.length).toEqual(1);
                const { createdAt, ...responseCourseData } = response.body.data[0];
                expect(responseCourseData).toEqual(expectedCourseData);
            });
        });

        describe("/course/:courseId (GET)", () => {
            it("get course detail", async () => {
                const response = await request(app.getHttpServer()).get("/course/1").expect(200);
                expect(response.body.statusCode).toEqual(200);
                expect(response.body.data).toBeInstanceOf(Object);
                expect(response.body.data.id).toEqual(1);
                const { createdAt, ...responseCourseData } = response.body.data;
                expect(responseCourseData).toEqual(expectedCourseData);
            });
        });
    });

    describe("RecruitController test", () => {
        describe("/recruit (POST)", () => {
            it("create recruit", async () => {
                const mock = mockInterceptorOnce(1, "post");
                const response = await request(app.getHttpServer())
                    .post("/recruit")
                    .send({
                        courseId: 1,
                        ...requestRecruitMockData,
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
                const { course, createdAt: createdRecruitAt, ...recruitResponseNoCourse } = response.body.data[0];
                expect(recruitResponseNoCourse).toEqual(expectedRecruitData);
                const { createdAt: createdCourseAt, ...courseWithOutCreatedAt } = course;
                expect(courseWithOutCreatedAt).toEqual(expectedCourseData);
            });
        });

        describe("/recruit/:recruitId (GET)", () => {
            it("get recruit detail", async () => {
                const mock = mockInterceptorOnce(1, "get");

                const response = await request(app.getHttpServer()).get("/recruit/1").expect(200);
                expect(response.body.statusCode).toEqual(200);
                expect(response.body.data).toBeInstanceOf(Object);
                mock.mockRestore();
            });
        });

        describe("/recruit/join (POST)", () => {
            it("join not existing recruit", async () => {
                const mock = mockInterceptorOnce(1, "post");

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
                const mock = mockInterceptorOnce(1, "post");
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
                await request(app.getHttpServer()).post("/user").send(mockUserNoEmail("June1234")).expect(201); // Create another user

                const mock = mockInterceptor(2, "post");

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
                let mock = mockInterceptorOnce(1, "post");
                await request(app.getHttpServer()).post("/recruit").send(mockRecruit).expect(201);

                mock = mockInterceptor(2, "post");

                const mockResponse: AxiosResponse<any, any> = mockAxiosResponse(201);
                const emailResponseMock = jest
                    .spyOn(httpService, "post")
                    .mockImplementationOnce(() => of(mockResponse));

                let response = await request(app.getHttpServer())
                    .post("/recruit/join")
                    .send({ recruitId: 2 })
                    .expect(201);

                response = await request(app.getHttpServer()).post("/recruit/join").send({ recruitId: 2 }).expect(201);

                expect(response.body.statusCode).toEqual(423);
                expect(response.body.message).toEqual("이미 참여중인 게시글입니다");
                expect(response.body.error).toEqual("Locked");
                mock.mockRestore();
                emailResponseMock.mockRestore();
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
                expect(response.body.statusCode).toEqual(201);
                mock.mockRestore();
            });
        });
    });

    describe("User Controller test", () => {
        describe("/user/me/course", () => {
            it("test user profile", async () => {
                const mock = mockInterceptor(2, "get");
                const response = await request(app.getHttpServer()).get("/user/me");
                const expectedResponseData = {
                    userId: "June1234",
                    hDong: { name: "서울특별시" },
                    pace: 300,
                };
                expect(response.body.statusCode).toEqual(200);
                expect(response.body.data).toEqual(expectedResponseData);
                mock.mockRestore();
            });
        });

        describe("/user/me/course", () => {
            it("test courses by user", async () => {
                const arr = Array.from(Array(15).keys());
                // create user A and B
                await request(app.getHttpServer()).post("/user").send(mockUserNoEmail("testaccountA")).expect(201);
                await request(app.getHttpServer()).post("/user").send(mockUserNoEmail("testaccountB")).expect(201);
                let mock = mockInterceptor(3, "post");
                for await (const i of arr.slice(0, 10)) {
                    // upload 10 course with user A
                    const response = await request(app.getHttpServer())
                        .post("/course")
                        .send(mockCourse(`course by A${i}`));
                    expect(response.body.statusCode).toEqual(201);
                }

                mock = mockInterceptor(4, "post");
                for await (const i of arr) {
                    // upload 15 course with user B
                    const response = await request(app.getHttpServer())
                        .post("/course")
                        .send(mockCourse(`course by B${i}`));
                    expect(response.body.statusCode).toEqual(201);
                }

                //request courses uploaded by userA (which is 10)
                mock = mockInterceptorOnce(3, "get");
                const userCoursesResponse = await request(app.getHttpServer()).get("/user/me/course");
                expect(userCoursesResponse.statusCode).toEqual(200);
                expect(userCoursesResponse.body.data).toBeInstanceOf(Array);
                expect(userCoursesResponse.body.data.length).toEqual(10); // OK

                mock.mockRestore();
            });
        });

        describe("/user/me/recruit", () => {
            it("test recruits by user", async () => {
                let mock = mockInterceptor(3, "post");
                for await (const i of arr.slice(1, 8)) {
                    //post 7 recruits of courseId 1 ~ 7 with user A
                    await request(app.getHttpServer())
                        .post("/recruit")
                        .send({ courseId: i, ...{ ...requestRecruitMockData, maxPpl: 10 } })
                        .expect(201);
                }

                mock = mockInterceptor(4, "post");
                for await (const i of arr.slice(8, 11)) {
                    //post 3 recruits of courseId 8 ~ 10 with user B
                    await request(app.getHttpServer())
                        .post("/recruit")
                        .send({ courseId: i, ...{ ...requestRecruitMockData, maxPpl: 10 } })
                        .expect(201);
                }

                // test how many recruits are attended by user A (expected 7)
                mock = mockInterceptor(3, "get");
                let userARecruitsResponse = await request(app.getHttpServer()).get("/user/me/recruit");
                expect(userARecruitsResponse.statusCode).toEqual(200);
                expect(userARecruitsResponse.body.data.length).toEqual(7); // OK

                //join userB's recruits with userA (recruitID: 10 ~ 12)

                //login with user A with post mode
                mock = mockInterceptor(3, "post");
                //prepare axios email mock response
                const mockResponse: AxiosResponse<any, any> = mockAxiosResponse(201);
                const emailResponseMock = jest.spyOn(httpService, "post").mockImplementation(() => of(mockResponse));
                for await (const i of arr.slice(10, 13)) {
                    await request(app.getHttpServer()).post("/recruit/join").send({ recruitId: i }).expect(201);
                }

                // finally, check how many recruits are attended by user A (expected 10)
                mock = mockInterceptor(3, "get");
                userARecruitsResponse = await request(app.getHttpServer()).get("/user/me/recruit");
                expect(userARecruitsResponse.statusCode).toEqual(200);
                expect(userARecruitsResponse.body.data.length).toEqual(10); // OK

                mock.mockRestore();
                emailResponseMock.mockRestore();
            });
        });
    });

    afterAll(async () => {
        await dataSource.dropDatabase();
        await app.close();
    });
});
