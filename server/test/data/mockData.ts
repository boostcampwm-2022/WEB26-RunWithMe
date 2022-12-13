export const mockCourse = (title: string) => {
    return {
        title: title,
        path: [
            { lat: 1, lng: 2 },
            { lat: 2, lng: 3 },
        ],
        pathLength: 300,
        hCode: "1100000000",
    };
};

export const mockRecruit = {
    title: "test example",
    startTime: new Date(2037, 11, 30).toISOString(),
    maxPpl: 5,
    pace: 300,
    courseId: 1,
};

export const mockUserNoEmail = (id: string) => {
    return {
        userId: id,
        password: "1234567890",
        pace: 300,
        hCode: "1100000000",
        email: "catenarywkd@naver.com",
        receiveMail: false,
    };
};

export const mockAxiosResponse = (statusCode: number) => {
    return {
        data: {},
        headers: {},
        config: {},
        statusText: "OK",
        status: statusCode,
    };
};
