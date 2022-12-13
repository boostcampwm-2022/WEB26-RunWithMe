export const getDisplayPaceString = (pace: number) => {
    return `${Math.floor(pace / 60)}'${String(pace % 60).padStart(2, "0")}"/km`;
};

export function hasNumber(myString: string) {
    return /\d/.test(myString);
}
export const getTimeFormat = (timeZone: string): string => {
    const date = timeZone.split("T")[0].split("-");
    const time = timeZone.split("T")[1].split(":");
    return `${date[0]}년 ${date[1]}월 ${date[2]}일 ${Number(time[0]) >= 12 ? "오후" : "오전"} ${
        Number(time[0]) % 12
    }시 ${time[1]}분`;
};
