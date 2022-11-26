import { useState } from "react";
import styled from "styled-components";
import { flexRowCenter } from "styles/flex";
import { faker } from "@faker-js/faker";
import { useRecoilValue } from "recoil";
import { userState } from "#atoms/userState";
import usePost from "#hooks/http/useHttpPost";
import axios from "axios";
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
const jejuExURL =
    "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/01cbb930-acab-4ec5-81c1-e72f91577cf8/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221126T161717Z&X-Amz-Expires=86400&X-Amz-Signature=aa2dd5105d1e161e950b30b4e9f01cc8bfaf78b8f9463ec47f8a616860728fbf&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject";
const Mock = () => {
    const userInfo = useRecoilValue(userState);
    const [reps, setReps] = useState(0);
    const [maxLat, setMaxLat] = useState(33.462789834085406);
    const [maxLng, setMaxLng] = useState(126.58443060603571);
    const [minLat, setMinLat] = useState(33.44850043013376);
    const [minLng, setMinLng] = useState(126.56573142547181);
    const [pathPoints, setPathPoints] = useState(5);
    const { post } = usePost();

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
        const myID = userInfo.userId;
        const randomImg = faker.image.cats(680, 480, true);
        const randomDong = faker.lorem.word();

        const randomCourse = {
            title: randomTitle,
            img: randomImg,
            path: randomPath,
            userId: myID,
            hCode: "1111111111",
        };
        console.log(randomCourse);
        return randomCourse;
    };

    const sendAxiosRequest = async (course: any) => {
        const response = await post("/course", course);
        const r = await axios.post("localhost:4000/course", course);
        console.log(r);
    };

    const handleSubmit = () => {
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
                <div>
                    경도(longitude)
                    <input onChange={handleMinLatChange} defaultValue={126.56573142547181}></input>
                    <span>~</span>
                    <input onChange={handleMaxLatChange} defaultValue={126.58443060603571}></input>
                    <div></div>
                    위도(latitude)&nbsp;&nbsp;&nbsp;
                    <input onChange={handleMinLngChange} defaultValue={33.44850043013376}></input>
                    <span>~</span>
                    <input onChange={handleMaxLngChange} defaultValue={33.462789834085406}></input>
                    <div></div>
                    경로의 점 수<input onChange={handlePathPointsChange} defaultValue={5}></input>
                </div>
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
