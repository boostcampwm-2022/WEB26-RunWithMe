import { useParams } from "react-router-dom";
import { useCallback, useState } from "react";
import useShowMap from "#hooks/useShowMap";
import useRecruitDetailQuery from "#hooks/queries/useRecruitDetailQuery";
import { getMiddlePoint } from "#utils/mapUtils";
import Header from "#components/Header/Header";
import RecruitContent from "#components/RecruitContent/RecruitContent";
import RecruitDetailModal from "#components/RecruitDetailModal/RecruitDetailModal";

const RecruitDetailPage = () => {
    const { id } = useParams();
    const { data: recruit, isLoading } = useRecruitDetailQuery(Number(id));
    const [modalVisible, setModalVisible] = useState(false);

    const renderMap = useCallback(
        useShowMap({
            height: `${window.innerHeight - 343 - 57}px`,
            center: getMiddlePoint(recruit?.path || []),
            runningPath: recruit?.path || [],
        }).renderMap,
        [recruit],
    );

    const toggleModalVisible = () => {
        setModalVisible((prev) => !prev);
    };

    if (isLoading) return <div>Loading...</div>;
    if (!recruit) return <div>404</div>;

    return (
        <>
            <Header text="모집 상세"></Header>
            {renderMap()}
            <RecruitContent data={recruit} onClick={toggleModalVisible} />
            {modalVisible && <RecruitDetailModal data={recruit} toggleModal={toggleModalVisible} id={Number(id)} />}
        </>
    );
};

export default RecruitDetailPage;
