import { useParams } from "react-router-dom";
import { useState } from "react";
import ShowMap from "#components/Map/ShowMap/ShowMap";
import useRecruitDetailQuery from "#hooks/queries/useRecruitDetailQuery";
import Header from "#components/Header/Header";
import RecruitContent from "#components/RecruitContent/RecruitContent";
import RecruitDetailModal from "#components/RecruitDetailModal/RecruitDetailModal";
import usePreload from "#hooks/usePreload";
import { Login, ChatPage } from "#pages/index";

const RecruitDetailPage = () => {
    usePreload(Login, ChatPage);
    const { id } = useParams();
    const { data: recruit } = useRecruitDetailQuery(Number(id));
    const [modalVisible, setModalVisible] = useState(false);

    const toggleModalVisible = () => {
        setModalVisible((prev) => !prev);
    };

    return (
        <>
            {recruit && (
                <>
                    <Header text="모집 상세"></Header>
                    <ShowMap height={`${window.innerHeight - 343 - 57}px`} path={recruit?.path || []} />
                    <RecruitContent data={recruit} onClick={toggleModalVisible} />
                    {modalVisible && (
                        <RecruitDetailModal data={recruit} toggleModal={toggleModalVisible} id={Number(id)} />
                    )}
                </>
            )}
        </>
    );
};

export default RecruitDetailPage;
