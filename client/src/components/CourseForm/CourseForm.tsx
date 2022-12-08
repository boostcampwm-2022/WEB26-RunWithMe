import Button from "#components/Button/Button";
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
import { InputWrapper } from "./CourseForm.styles";
import ConfirmModal from "#components/ConfirmModal/ConfirmModal";
import { LOCAL_API_PATH } from "#types/LocalAPIType";

const CourseForm = () => {
    const [title, onChangeTitle] = useInput(courseTitleValidator);
    const query = useLocalAPI<RegionResponse>(LOCAL_API_PATH.REGION_CODE);
    const { post } = useHttpPost();
    const navigate = useNavigate();
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const { renderMap, pathLength, getPath } = useWriteMap({
        height: `${window.innerHeight - 307}px`,
        center: { lat: 33.450701, lng: 126.570667 },
    });

    const checkFormValidation = () => {
        if (title && getPath().length) {
            handleToggleConfirmModal();
        }
    };

    const handleToggleConfirmModal = () => {
        setShowConfirmModal((prev) => !prev);
    };

    const onClickInsertButton = useCallback(async () => {
        try {
            const path = getPath();
            const { lng: x, lat: y } = getLatLngByXY(path[0]);
            const regions = await query({ x, y });
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
    }, [title, pathLength]);

    return (
        <>
            {renderMap()}
            <InputWrapper>
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
            </InputWrapper>

            {showConfirmModal && (
                <ConfirmModal
                    text="등록 하시겠습니까?"
                    handleToggleModal={handleToggleConfirmModal}
                    confirmOnClick={onClickInsertButton}
                ></ConfirmModal>
            )}
        </>
    );
};

export default CourseForm;
