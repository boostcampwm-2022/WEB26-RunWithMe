import Header from "#components/Header/Header";
import Button from "#components/Button/Button";
import { Content, Title } from "../RecruitDetail.styles";
import { useParams } from "react-router-dom";
import { userState } from "#atoms/userState";
import { useRecoilValue } from "recoil";
import useHttpPost from "#hooks/http/useHttpPost";
import useHttpGet from "#hooks/http/useHttpGet";
import { useEffect, useState, useCallback } from "react";
import useShowMap from "#hooks/useShowMap";
import { getPaceFormat } from "#utils/paceUtils";

const RecruitDetail = () => {
    const { id } = useParams();
    const userInfo = useRecoilValue(userState);
    const { post } = useHttpPost();
    const { get } = useHttpGet();
    const [title, setTitle] = useState("제목");
    const [startPoint, setStartPoint] = useState("출발점");
    const [pace, setPace] = useState("페이스ㄴ");
    const [startTime, setStartTime] = useState("집합 일시");
    const [author, setAuthor] = useState("게시자");
    const [maxPpl, setMaxPpl] = useState("최대 인원");
    const [currentPpl, setCurrentPpl] = useState("현재 인원");
    const [path, setPath] = useState([]);
    const [middlePoint, setMiddlePoint] = useState({ lat: 0, lng: 0 });

    const getTimeFormat = (timeZone: string): string => {
        const date = timeZone.split("T")[0].split("-");
        const time = timeZone.split("T")[1].split(":");
        return `${date[0]}년 ${date[1]}월 ${date[2]}일 ${Number(time[0]) >= 12 ? "오후" : "오전"} ${time[0]}시 ${
            time[1]
        }분`;
    };
    const onSubmitJoin = async () => {
        try {
            await post("/recruit/join", {
                recruitId: id,
                userId: userInfo.userIdx,
            });
            alert("참여 완료");
        } catch (error: any) {
            alert(error.message);
        }
    };
    const renderMap = useCallback(
        useShowMap({
            height: `${window.innerHeight - 307}px`,
            center: { lat: middlePoint.lat, lng: middlePoint.lng },
            runningPath: path,
            level: 5,
        }).renderMap,
        [path, middlePoint],
    );
    const getMiddlePoint = (path: { lat: number; lng: number }[]) => {
        let minLat = 90;
        let maxLat = -90;
        let minLng = 180;
        let maxLng = -180;
        for (const point of path) {
            if (minLat > point.lat) {
                minLat = point.lat;
            }
            if (maxLat < point.lat) {
                maxLat = point.lat;
            }
            if (minLng > point.lng) {
                minLng = point.lng;
            }
            if (maxLng < point.lng) {
                maxLng = point.lng;
            }
        }
        return { lat: (minLat + maxLat) / 2, lng: (minLng + maxLng) / 2 };
    };
    const getRecruitDetail = useCallback(async () => {
        try {
            const response = await get(`/recruit/${id}`);
            setTitle(response.title);
            setStartPoint(response.hDong.name);
            setPace(getPaceFormat(response.pace));
            setStartTime(getTimeFormat(response.startTime));
            setAuthor(response.userId);
            setMaxPpl(response.maxPpl);
            setCurrentPpl(response.currentPpl);
            setPath(JSON.parse(response.path));
            setMiddlePoint(getMiddlePoint(JSON.parse(response.path)));
        } catch {}
    }, []);

    useEffect(() => {
        if (!userInfo.accessToken) {
            return;
        }
        getRecruitDetail();
    }, [userInfo]);
    return (
        <>
            <Header text="모집 상세"></Header>
            {renderMap()}
            <Title>{title}</Title>
            <Content>
                <div>
                    <span>출발점</span>
                    <p>{startPoint}</p>
                </div>
                <div>
                    <span>페이스</span>
                    <p>{pace}/km</p>
                </div>
                <div>
                    <span>집합 일시</span>
                    <p>{startTime}</p>
                </div>
                <div>
                    <span>게시자</span>
                    <p>{author}</p>
                </div>
                <div>
                    <span>참가 현황</span>
                    <p>
                        {currentPpl} / {maxPpl}
                    </p>
                </div>
                <Button width="fit" onClick={onSubmitJoin}>
                    참여하기
                </Button>
            </Content>
        </>
    );
};

export default RecruitDetail;
