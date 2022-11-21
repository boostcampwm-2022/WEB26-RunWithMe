export const getDisplayPaceString = (pace: number) => {
    return `${Math.floor(pace / 60)}'${String(pace % 60).padStart(2, "0")}"/km`;
};
