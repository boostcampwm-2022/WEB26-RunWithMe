import styled from "styled-components";
import { COLOR } from "styles/color";
import { flexRowSpaceBetween } from "styles/flex";
import { SEARCH_ICON } from "#assets/icons";

const SearchBarWrapper = styled.div`
    ${flexRowSpaceBetween};
    align-items: center;
    border-bottom: ${`1px solid ${COLOR.BABY_BLUE}`};
    padding: 16px 16px;
    img {
        cursor: pointer;
        width: 16px;
        height: 16px;
    }
    input {
        width: 100%;
        height: 20px;
        border: none;
        background: transparent;
    }
    input:focus {
        outline: none;
    }
`;

const SearchBar = () => {
    return (
        <>
            <SearchBarWrapper>
                <input></input>
                <img src={SEARCH_ICON} />
            </SearchBarWrapper>
        </>
    );
};

export default SearchBar;
