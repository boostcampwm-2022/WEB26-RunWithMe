import Button from "#components/Button/Button";
import Header from "#components/Header/Header";
import Input from "#components/Input/Input";
import useWriteMap from "#hooks/useWriteMap";
import useHttpPost from "#hooks/http/useHttpPost";
import useInput from "#hooks/useInput";
import useLocalAPI from "#hooks/useLocalAPI";
import getLatLngByXY from "#utils/mapUtils";
import { PLACEHOLDER } from "#constants/placeholder";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { courseTitleValidator } from "#utils/validationUtils";
import { RegionResponse } from "#types/Region";
import { CourseForm } from "./NewCourse.styles";
import useAuth from "#hooks/useAuth";
import ConfirmModal from "#components/ConfirmModal/ConfirmModal";
import { LOCAL_API_PATH } from "#types/LocalAPIType";
//#endregion

const NewCourse = () => {
    const [title, onChangeTitle] = useInput(courseTitleValidator);
    const query = useLocalAPI<RegionResponse>(LOCAL_API_PATH.REGION_CODE);
    const { post } = useHttpPost();
    const navigate = useNavigate();
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const { renderMap, pathLength, path } = useWriteMap({
        height: `${window.innerHeight - 307}px`,
        center: { lat: 33.450701, lng: 126.570667 },
    });

    const checkFormValidation = () => {
        if (title && path.length) {
            handleToggleConfirmModal();
            console.log(title);
        }
    };

    const handleToggleConfirmModal = () => {
        setShowConfirmModal(!showConfirmModal);
    };

    const onClickInsertButton = useCallback(async () => {
        try {
            const { lng: x, lat: y } = getLatLngByXY(path[0]);
            const regions = await query({ x, y });
            // [0]: BCode, [1]: HCode
            const { code: hCode } = regions.documents[1];
            const response: any = await post("/course", {
                title,
                path: path.map(getLatLngByXY),
                pathLength,
                hCode,
            });
            navigate(`/course/${response.data.courseId}`);
        } catch (error: any) {
            alert(error.message);
        }
    }, [path, title, pathLength]);

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
                <Button width="fit" onClick={checkFormValidation}>
                    코스 등록
                </Button>
            </CourseForm>
            <ConfirmModal
                text="등록 하시겠습니까?"
                showModal={showConfirmModal}
                handleToggleModal={handleToggleConfirmModal}
                confirmOnClick={onClickInsertButton}
            ></ConfirmModal>
        </div>
    );
};

export default NewCourse;
