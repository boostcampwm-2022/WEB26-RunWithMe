import Button from "#components/Button/Button";
import Input from "#components/Input/Input";
import WriteMap from "#components/Map/WriteMap/WriteMap";
import useInput from "#hooks/useInput";
import useLocalAPI from "#hooks/useLocalAPI";
import getLatLngByXY from "#utils/mapUtils";
import { PLACEHOLDER } from "#constants/placeholder";
import { Suspense, useCallback, useState } from "react";
import { courseTitleValidator } from "#utils/validationUtils";
import { RegionResponse } from "#types/Region";
import { InputWrapper, MapContainer } from "./CourseForm.styles";
import ConfirmModal from "#components/ConfirmModal/ConfirmModal";
import { LOCAL_API_PATH } from "#types/LocalAPIType";
import usePostCourseMutation from "#hooks/queries/usePostCourseMutation";
import Loading from "#components/commons/Loading/Loading";

const CourseForm = () => {
    const [title, onChangeTitle] = useInput(courseTitleValidator);
    const query = useLocalAPI<RegionResponse>(LOCAL_API_PATH.REGION_CODE);
    const { mutate } = usePostCourseMutation();
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [path, setPath] = useState<(kakao.maps.LatLng | kakao.maps.LatLng[])[]>([]);
    const [pathLength, setPathLength] = useState(0);

    const getExpandedPath = () =>
        path.reduce<kakao.maps.LatLng[]>((acc, cur) => {
            if (Array.isArray(cur)) return [...acc, ...cur];
            return [...acc, cur];
        }, []);

    const checkFormValidation = () => {
        if (title && getExpandedPath().length) {
            handleToggleConfirmModal();
        }
    };

    const handleToggleConfirmModal = () => {
        setShowConfirmModal((prev) => !prev);
    };

    const onClickInsertButton = useCallback(async () => {
        try {
            const path = getExpandedPath();
            const { lng: x, lat: y } = getLatLngByXY(path[0]);
            const regions = await query({ x, y });
            const { code: hCode } = regions.documents[1];
            mutate({ title: title as string, path: path.map(getLatLngByXY), pathLength, hCode });
        } catch (error: any) {
            alert(error.message);
        }
    }, [title, pathLength]);

    return (
        <>
            <MapContainer height={`${window.innerHeight - 307}px}`}>
                <Suspense fallback={<Loading />}>
                    <WriteMap path={path} setPath={setPath} setPathLength={setPathLength} />
                </Suspense>
            </MapContainer>
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
