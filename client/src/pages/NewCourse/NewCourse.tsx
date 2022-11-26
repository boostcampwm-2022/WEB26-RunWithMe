//#region import
import Button from "#components/Button/Button";
import Header from "#components/Header/Header";
import Input from "#components/Input/Input";
import useWriteMap from "#hooks/useWriteMap";
import useHttpPost from "#hooks/http/useHttpPost";
import useInput from "#hooks/useInput";
import useLocalAPI from "#hooks/useLocalAPI";
import getLatLngByXY from "#utils/mapUtils";
import { PLACEHOLDER } from "#constants/placeholder";
import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "#atoms/userState";
import { useNavigate } from "react-router-dom";
import { courseTitleValidator } from "#utils/valitationUtils";
import { RegionResponse } from "#types/Region";
import { CourseForm } from "./NewCourse.styles";
//#endregion
const img =
    "https://kr.object.ncloudstorage.com/j199/img/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202022-11-20%20%EC%98%A4%ED%9B%84%204.01.56.png";
const NewCourse = () => {
    const { userIdx: userId } = useRecoilValue(userState);
    const [title, onChangeTitle] = useInput(courseTitleValidator);
    const query = useLocalAPI<RegionResponse>("/geo/coord2regioncode.json");
    const { post } = useHttpPost();
    const navigate = useNavigate();

    const { renderMap, pathLength, path } = useWriteMap({
        height: `${window.innerHeight - 307}px`,
        center: { lat: 33.450701, lng: 126.570667 },
    });

    const onClickInsertButton = useCallback(async () => {
        if (!title || !path.length) return;
        try {
            const { lng: x, lat: y } = getLatLngByXY(path[0]);
            const regions = await query({ x, y });
            // [0]: BCode, [1]: HCode
            const { code: hCode, region_3depth_name: name } = regions.documents[1];
            const response = await post("/course", {
                title,
                path: path.map(getLatLngByXY),
                img,
                pathLength,
                userId,
                hCode,
                name,
            });
            navigate(`/course/${response.courseId}`);
        } catch (error: any) {
            alert(error.message);
        }
    }, [path]);

    return (
        <div style={{ height: "100vh", maxHeight: "100vh" }}>
            <Header text="코스 등록" />
            {renderMap()}
            <CourseForm>
                <div>
                    <span>총 거리</span>
                    <p>{`${(pathLength / 1000).toFixed(1)}km`}</p>
                </div>
                <div>
                    <span>코스명</span>
                    <Input onChange={onChangeTitle} placeholder={PLACEHOLDER.COURSE_NAME}></Input>
                </div>
                <Button width="fit" onClick={onClickInsertButton}>
                    코스 등록
                </Button>
            </CourseForm>
        </div>
    );
};

export default NewCourse;
