import { useState } from "react";
import styled from "styled-components";
import { flexRowCenter } from "styles/flex";
import { faker } from "@faker-js/faker";
import usePost from "#hooks/http/useHttpPost";
import { hdongs } from "#constants/hdongs";
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
const Mock = () => {
    const [reps, setReps] = useState(0);
    const [maxLat, setMaxLat] = useState(33.462789834085406);
    const [maxLng, setMaxLng] = useState(126.58443060603571);
    const [minLat, setMinLat] = useState(33.44850043013376);
    const [minLng, setMinLng] = useState(126.56573142547181);
    const [minLen, setMinLen] = useState(0);
    const [maxLen, setMaxLen] = useState(5000);
    const [pathPoints, setPathPoints] = useState(5);
    const { post } = usePost();

    const handleMinLenChange = (e: any) => {
        setMinLen(e.target.value);
    };

    const handleMaxLenChange = (e: any) => {
        setMaxLen(e.target.value);
    };

    const handleRepsChange = (e: any) => {
        setReps(e.target.value);
    };
    const handleMaxLatChange = (e: any) => {
        setMaxLat(e.target.value);
    };
    const handleMinLatChange = (e: any) => {
        setMinLat(e.target.value);
    };
    const handleMaxLngChange = (e: any) => {
        setMaxLng(e.target.value);
    };
    const handleMinLngChange = (e: any) => {
        setMinLng(e.target.value);
    };
    const handlePathPointsChange = (e: any) => {
        setPathPoints(e.target.value);
    };

    const generateRandomCourse = () => {
        const randomTitle = faker.lorem.sentences(faker.datatype.number({ max: 3, min: 1 }));

        const randomPath = [];

        for (let i = 0; i < pathPoints; i++) {
            const randQa = faker.datatype.float({
                min: minLng,
                max: maxLng,
                precision: 0.00000000000001,
            });

            const randMa = faker.datatype.float({
                min: minLat,
                max: maxLat,
                precision: 0.00000000000001,
            });
            randomPath.push({ lat: randMa, lng: randQa });
        }
        const randomImg = faker.image.cats(680, 480, true);
        const maxHdong = hdongs.length;
        const randomHcodeIdx = faker.datatype.number({ max: maxHdong - 1, min: 0 });
        const randomCourse = {
            title: randomTitle,
            img: randomImg,
            path: randomPath,
            userId: 1,
            pathLength: faker.datatype.number({ min: minLen, max: maxLen }),
            hCode: hdongs[randomHcodeIdx][0],
        };
        return randomCourse;
    };

    const sendAxiosRequest = async (course: any) => {
        await post("/course", course);
    };

    const handleSubmit = async () => {
        for (let i = 0; i < reps; i++) {
            sendAxiosRequest(generateRandomCourse());
        }
    };

    return (
        <>
            <CenterWrapper>
                <div>코스데이터 생성기</div>
                <div>
                    반복횟수
                    <input placeholder={"0"} onChange={handleRepsChange}></input>
                </div>
                <InputWrapper>
                    <Input>
                        경도(longitude)
                        <input onChange={handleMinLatChange} defaultValue={126.56573142547181}></input>
                        <span>~</span>
                        <input onChange={handleMaxLatChange} defaultValue={126.58443060603571}></input>
                    </Input>
                    <Input>
                        위도(latitude)&nbsp;&nbsp;&nbsp;
                        <input onChange={handleMinLngChange} defaultValue={33.44850043013376}></input>
                        <span>~</span>
                        <input onChange={handleMaxLngChange} defaultValue={33.462789834085406}></input>
                    </Input>
                    <div></div>
                    <Input>
                        총 길이
                        <input onChange={handleMinLenChange} defaultValue={0}></input>
                        <span>~</span>
                        <input onChange={handleMaxLenChange} defaultValue={5000}></input>
                    </Input>
                    <div></div>
                    <Input>
                        경로의 점 수<input onChange={handlePathPointsChange} defaultValue={5}></input>
                    </Input>
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

export default Mock;
