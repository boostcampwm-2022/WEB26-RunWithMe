import Button from "#components/Button/Button";
import Header from "#components/Header/Header";
import Input from "#components/Input/Input";
import { PLACEHOLDER } from "#constants/placeholder";
import styled from "styled-components";
import { COLOR } from "styles/color";
import { flexColumn } from "styles/flex";
import useWriteMap from "#hooks/useWriteMap";
const CourseForm = styled.div`
    ${flexColumn};
    align-items: center;
    width: 100%;
    height: "240px";
    box-shadow: 0px -4px 4px rgba(0, 0, 0, 0.25);
    padding: 15px 27px;
    div {
        margin-bottom: 10px;
        width: 100%;
        p {
            padding: 16px;
            border-bottom: 1px solid ${COLOR.BABY_BLUE};
        }
    }
`;

const NewCourse = () => {
    const { renderMap, pathLength } = useWriteMap({
        height: `${window.innerHeight - 307}px`,
        center: { lat: 33.450701, lng: 126.570667 },
    });

    return (
        <div style={{ height: "100vh", maxHeight: "100vh" }}>
            <Header text="코스 등록" loggedIn={true} />
            {renderMap()}
            <CourseForm>
                <div>
                    <span>총 거리</span>
                    <p>{`${(pathLength / 1000).toFixed(1)}km`}</p>
                </div>
                <div>
                    <span>코스명</span>
                    <Input placeholder={PLACEHOLDER.COURSE_NAME}></Input>
                </div>
                <Button width="fit" onClick={console.log}>
                    코스 등록
                </Button>
            </CourseForm>
        </div>
    );
};

export default NewCourse;
