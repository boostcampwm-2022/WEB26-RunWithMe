export enum TIME {
    ACCESS_TOKEN_EXPIRE_TIME = 15 * 60 * 1000,
    MINUTE_IN_SECONDS = 60 * 1000,
    SECOND_IN_MILLISECONDS = 1000,
    MINUTE_IN_MILLISECONDS = 60 * 1000,
    HOUR_IN_MILLISECONDS = 60 * 60 * 1000,
    DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000,
}

export const MILLISECONDS_TO_DAYS = (time: number) => {
    return Math.floor(time / TIME.DAY_IN_MILLISECONDS);
};

export const MILLISECONDS_TO_HOURS = (time: number) => {
    return Math.floor(time / TIME.HOUR_IN_MILLISECONDS);
};

export const MILLISECONDS_TO_MINUTES = (time: number) => {
    return Math.floor(time / TIME.MINUTE_IN_MILLISECONDS);
};
