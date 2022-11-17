export const idValidator = (id: string) => {
    if (id.length >= 6 && id.length <= 20) return "";
    if (!id.length) return "ID를 입력해 주세요";
    if (!/^[a-zA-Z0-9]*$/g.test(id)) return "영문 대소문자, 숫자만 입력이 가능합니다";
    return "ID는 6자 이상 20자 이하여야 합니다";
};
