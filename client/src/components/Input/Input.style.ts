import styled from "styled-components";
import { COLOR } from "styles/color";

export const InputWrapper = styled.div<{ width: string }>`
    display: flex;
    padding: 16px;
    border-bottom: ${`1px solid ${COLOR.BABY_BLUE}`};
    width: ${({ width }) => width};
    input {
        color: ${COLOR.BLACK};
        border: none;
        :focus {
            outline: none;
        }
        ::placeholder {
            color: ${COLOR.BABY_BLUE};
        }
        /* Chrome, Safari, Edge, Opera */
        ::-webkit-outer-spin-button,
        ::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }
        /* Firefox */
        [type="number"] {
            -moz-appearance: textfield;
        }

        :disabled {
            background: none;
        }
    }
    p {
        color: ${COLOR.BABY_BLUE};
        text-align: right;
        width: 20%;
    }
`;
