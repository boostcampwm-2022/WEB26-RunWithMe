import Header from "#components/Header/Header";
import Button from "#components/Button/Button";
import { Content, Title } from "./CourseDetail.styles";
import Modal from "#components/Modal/Modal";
import { useCallback, useEffect, useState } from "react";
import Input from "#components/Input/Input";
import { COLOR } from "styles/color";
import styled from "styled-components";
import { flexRowSpaceAround } from "styles/flex";
import { PLACEHOLDER } from "#constants/placeholder";
import PaceInput from "#components/Input/PaceInput/PaceInput";
import usePaceInput from "#hooks/usePaceInput";
import useInput from "#hooks/useInput";
import { recruitTitleValidator } from "#utils/validationUtils";
import useHttpPost from "#hooks/http/useHttpPost";
import { useNavigate, useParams } from "react-router-dom";
import StartTimeInput from "#components/Input/StartTimeInput/StartTimeInput";
import MaxPplInput from "#components/Input/MaxPplInput/MaxPplInput";
import useStartTimeInput from "#hooks/useStartTimeInput";
import useMaxPplInput from "#hooks/useMaxPplInput";
import useHttpGet from "#hooks/http/useHttpGet";
import { InputWrapper } from "#pages/SignUp/SignUp.styles";
import { useRecoilValue } from "recoil";
import { userState } from "#atoms/userState";
import useShowMap from "#hooks/useShowMap";
import { getMiddlePoint } from "#utils/pathUtils";

const Buttons = styled.div`
    ${flexRowSpaceAround}
    padding-top: 16px;
`;

const CourseDetail = () => {
    const userInfo = useRecoilValue(userState);
    const [courseTitle, setCourseTitle] = useState("제목");
    const [startPoint, setStartPoint] = useState("출발점");
    const [totalLength, setTotalLength] = useState(0);
    const [author, setAuthor] = useState("게시자");

    const [path, setPath] = useState([]);

    const [title, onChangeTitle, titleError] = useInput(recruitTitleValidator);
    const { pace, onChangeMinute, onChangeSecond } = usePaceInput();
    const { startTime, onChangeStartTime } = useStartTimeInput();
    const { maxPpl, onChangeMaxPpl } = useMaxPplInput();

    const renderMap = useCallback(
        useShowMap({
            height: `70vh`,
            center: getMiddlePoint(path),
            runningPath: path,
        }).renderMap,
        [path],
    );

    const checkFormValidation = () => title && maxPpl && startTime && pace;

    const [showModal, setShowModal] = useState(false);
    const { post } = useHttpPost();
    const { get } = useHttpGet();
    const { id } = useParams();
    const navigate = useNavigate();

    const handleToggleModal = () => {
        setShowModal(!showModal);
    };

    const onSubmitRecruit = async () => {
        if (!checkFormValidation()) return;
        try {
            const { data } = await post("/recruit", {
                title,
                courseId: id,
                startTime,
                maxPpl,
                pace: pace.minute * 60 + pace.second,
                userId: userInfo.userIdx,
            });

            navigate(`/recruit/${data.recruitId}`);
        } catch (error: any) {
            alert(error.message);
        }
    };

    const getCourseDetail = useCallback(async () => {
        try {
            const response = await get(`/course/${id}`);
            setCourseTitle(response.title);
            setTotalLength(response.pathLength / 1000);
            setStartPoint(response.hDong.name);
            setAuthor(response.userId);
            setPath(JSON.parse(response.path));
        } catch {}
    }, []);

    useEffect(() => {
        getCourseDetail();
    }, []);

    return (
        <>
            <Header text="코스 상세"></Header>
            {renderMap()}
            <Title>{courseTitle}</Title>
            <Content>
                <div>
                    <span>출발점</span>
                    <p>{startPoint}</p>
                </div>
                <div>
                    <span>총 거리</span>
                    <p>{totalLength}km</p>
                </div>
                <div>
                    <span>게시자</span>
                    <p>{author}</p>
                </div>
                <Button width="fit" onClick={handleToggleModal}>
                    이 코스로 모집하기
                </Button>
            </Content>
            <InputWrapper>
                <Modal toggled={showModal} toggleVisible={handleToggleModal}>
                    <Input placeholder={PLACEHOLDER.TITLE} type="text" onChange={onChangeTitle}></Input>
                    <span>{titleError}</span>
                    <MaxPplInput onChangePpl={onChangeMaxPpl}></MaxPplInput>
                    <StartTimeInput onChangeTime={onChangeStartTime}></StartTimeInput>
                    <PaceInput onChangeMinute={onChangeMinute} onChangeSecond={onChangeSecond}></PaceInput>
                    <Buttons>
                        <Button backgroundColor={COLOR.DARK_GRAY} onClick={handleToggleModal}>
                            취소
                        </Button>
                        <Button onClick={onSubmitRecruit}>등록</Button>
                    </Buttons>
                </Modal>
            </InputWrapper>
        </>
    );
};

export default CourseDetail;