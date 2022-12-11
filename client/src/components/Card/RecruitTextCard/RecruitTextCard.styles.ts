import styled from "styled-components";

export const Card = styled.div`
    padding: 12px 16px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    div:not(:last-child) {
        margin-bottom: 30px;
    }
    h2 {
        display: block;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        max-width: 100%;
        margin-bottom: 12px !important;
    }
`;
