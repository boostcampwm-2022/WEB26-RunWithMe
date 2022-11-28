export const getPaceFormat = (sec: number): string => {
    return `${parseInt(String(sec / 60))}'${sec % 60}"`;
};
