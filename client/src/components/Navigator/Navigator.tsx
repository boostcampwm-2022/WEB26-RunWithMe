import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { COLOR } from "styles/color";

export const OptionsWrapper = styled.div`
    margin-top: 40px;
    color: ${COLOR.DARK_GRAY};
    display: flex;
    justify-content: center;
    width: 100%;
    span {
        cursor: pointer;
        padding: 0 1rem;
    }

    span:not(:last-child) {
        border-right: 0.1rem solid grey;
    }
`;

type NavigatePath = { to: string; text: string };

interface NavigatorProps {
    path: NavigatePath[];
}

const Navigator = ({ path }: NavigatorProps) => {
    const navigate = useNavigate();
    return (
        <OptionsWrapper>
            {path.map((el, idx) => (
                <span key={`navigator_${idx}`} onClick={() => navigate(`/${el.to}`)}>
                    {el.text}
                </span>
            ))}
        </OptionsWrapper>
    );
};

export default Navigator;
