export const idValidator = (id: string) => {
    if (id.length >= 6 && id.length <= 20) return "";
    if (!id.length) return "ID를 입력해 주세요";
    if (!/^[a-zA-Z0-9]*$/g.test(id)) return "영문 대소문자, 숫자만 입력이 가능합니다";
    return "ID는 6자 이상 20자 이하여야 합니다";
};

export const passwordValidator = (password: string) => {
    return password.length < 10 || password.length > 100 ? "비밀번호는 10자 이상 100자 이하여야 합니다" : "";
};
export const confirmPasswordValidator = (password: string) => (confirmPassword: string) => {
    return password !== confirmPassword || !confirmPassword ? "비밀번호를 한번 더 입력하세요" : "";
};

export const zipCodeValidator = (zipCode: string) => {
    return zipCode.length === 5 ? "" : "지역을 입력하세요";
};
