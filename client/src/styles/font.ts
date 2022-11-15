import { css } from "styled-components";

export const fontMidium = (color: string, weight: string | number) => css`
    font-size: 1.4rem;
    font-weight: ${String(weight)};
    color: ${color};
`;
export const fontSmall = (color: string, weight: string | number) => css`
    font-size: 1.2rem;
    font-weight: ${String(weight)};
    color: ${color};
`;
export const fontXSmall = (color: string, weight: string | number) => css`
    font-size: 1rem;
    font-weight: ${String(weight)};
    color: ${color};
`;
export const fontLarge = (color: string, weight: string | number) => css`
    font-size: 1.6rem;
    font-weight: ${String(weight)};
    color: ${color};
`;
export const fontXLarge = (color: string, weight: string | number) => css`
    font-size: 1.8rem;
    font-weight: ${String(weight)};
    color: ${color};
`;
