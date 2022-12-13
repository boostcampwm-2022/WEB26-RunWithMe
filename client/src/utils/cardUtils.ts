import { MILLISECONDS_TO_DAYS, MILLISECONDS_TO_HOURS, MILLISECONDS_TO_MINUTES, TIME } from "#constants/time";

export const timeDifference = (startTime: string) => {
    const diff = Math.abs(new Date().valueOf() - new Date(startTime).valueOf());
    const sign = new Date().valueOf() > new Date(startTime).valueOf();
    if (diff > TIME.DAY_IN_MILLISECONDS) return MILLISECONDS_TO_DAYS(diff) + "일 " + (sign ? "전" : "후");
    if (diff > TIME.HOUR_IN_MILLISECONDS) return MILLISECONDS_TO_HOURS(diff) + "시간 " + (sign ? "전" : "후");
    if (diff >= TIME.MINUTE_IN_MILLISECONDS) return MILLISECONDS_TO_MINUTES(diff) + "분 " + (sign ? "전" : "후");
    if (diff < TIME.MINUTE_IN_MILLISECONDS) return "방금 전";
};
