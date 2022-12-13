import { useEffect, useState } from "react";
import styled from "styled-components";
import { flexRowCenter } from "styles/flex";
import { faker } from "@faker-js/faker";
import usePost from "#hooks/http/useHttpPost";
import { useRecoilState } from "recoil";
import useGet from "#hooks/http/useHttpGet";
import { userState } from "#atoms/userState";

export const CenterWrapper = styled.div`
    ${flexRowCenter}
    flex-direction: column;
    gap: 10px;
    input {
        margin-left: 10px;
    }
    label {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
`;

export const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    input {
        width: 200px;
    }
`;

export const Input = styled.div`
    display: flex;
`;
const jejuExURL =
    "https://user-images.githubusercontent.com/53655119/204238717-6b1ff83d-6d85-4ab8-9b4f-056947147706.png";
const MockRecruits = () => {
    const [userInfo] = useRecoilState(userState);
    const [reps, setReps] = useState(0);
    const [minppl, setMinppl] = useState(1);
    const [maxppl, setMaxppl] = useState(5);
    const [maxTime, setMaxTime] = useState(10);
    const [minPace, setMinPace] = useState(0);
    const [maxPace, setMaxPace] = useState(600);
    const [coursesCount, setCoursesCount] = useState(0);

    useEffect(() => {
        async function fetchData() {
            const cc = await get("course/count");
            setCoursesCount(cc.data);
        }
        fetchData();
    }, []);
    const { get } = useGet();
    const { post } = usePost();

    const handleRepsChange = (e: any) => {
        setReps(e.target.value);
    };

    const handleMinpplChange = (e: any) => {
        setMinppl(e.target.value);
    };
    const handleMaxpplChange = (e: any) => {
        setMaxppl(e.target.value);
    };
    const handleMaxTimeChange = (e: any) => {
        setMaxTime(e.target.Value);
    };
    const handleMinPaceChange = (e: any) => {
        setMinPace(e.target.Value);
    };
    const handleMaxPaceChange = (e: any) => {
        setMaxPace(e.target.Value);
    };

    const generateRandomRecruit = async () => {
        const randomTitle = faker.lorem.sentences(faker.datatype.number({ max: 3, min: 1 }));
        const randomMaxppl = faker.datatype.number({ min: minppl, max: maxppl });
        const randomPace = faker.datatype.number({ min: minPace, max: maxPace });
        let currentDate = new Date();
        const offset = currentDate.getTimezoneOffset() * 60000;
        currentDate = new Date(currentDate.getTime() - offset);
        currentDate.setHours(currentDate.getHours() + faker.datatype.number({ min: 0, max: maxTime }));
        const randomStartTime = currentDate.toISOString().substring(0, 16);
        const randomCourseIdx = faker.datatype.number({ min: 1, max: coursesCount - 1 });

        const randomRecruit = {
            title: randomTitle,
            courseId: randomCourseIdx,
            startTime: randomStartTime,
            maxPpl: randomMaxppl,
            pace: randomPace,
            userId: userInfo.userIdx,
        };
        return randomRecruit;
    };

    const sendAxiosRequest = async (recruit: any) => {
        await post("/recruit", await recruit);
    };
    const handleSubmit = async () => {
        for (let i = 0; i < reps; i++) {
            sendAxiosRequest(generateRandomRecruit());
        }
    };

    return (
        <>
            <CenterWrapper>
                <div>모집데이터 생성기</div>
                <div>
                    반복횟수
                    <input placeholder={"0"} onChange={handleRepsChange}></input>
                </div>
                <InputWrapper>
                    <Input>
                        인원수
                        <input onChange={handleMinpplChange} defaultValue={1}></input>
                        <span>~</span>
                        <input onChange={handleMaxpplChange} defaultValue={5}></input>
                    </Input>
                    <Input>
                        페이스
                        <input onChange={handleMinPaceChange} defaultValue={0}></input>
                        <span>~</span>
                        <input onChange={handleMaxPaceChange} defaultValue={600}></input>
                    </Input>
                    <Input>
                        지금부터 최대 몇시간 후<input onChange={handleMaxTimeChange} defaultValue={10}></input>
                    </Input>
                    <div></div>
                </InputWrapper>
                <button onClick={handleSubmit}>Submit</button>
                <div> 제주도 예시</div>
                <div> (lng) min: 33.44850043013376, max: 33.462789834085406</div>
                <div> (lat)min: 126.56573142547181, max: 126.58443060603571</div>
                <img src={jejuExURL}></img>
            </CenterWrapper>
        </>
    );
};

export default MockRecruits;
