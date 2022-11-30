export const idValidator = (id: string) => {
    if (!id.length) return "ID를 입력해 주세요";
    if (!(id.length >= 6 && id.length <= 20)) return "ID는 6자 이상 20자 이하여야 합니다";
    if (!/^[a-zA-Z0-9]*$/g.test(id)) return "영문 대소문자, 숫자만 입력이 가능합니다";
    return "";
};

export const passwordValidator = (password: string) => {
    return password.length < 10 || password.length > 100 ? "비밀번호는 10자 이상 100자 이하여야 합니다" : "";
};

export const confirmPasswordValidator = (password: string) => (confirmPassword: string) => {
    return password !== confirmPassword || !confirmPassword ? "비밀번호가 일치하지 않습니다" : "";
};

export const hNameValidator = (hCode: string) => {
    return hCode.length === 10 ? "" : "지역을 입력하세요";
};

export const courseTitleValidator = (title: string) => {
    return !title.trim() ? "제목을 입력하세요" : "";
};

export const recruitTitleValidator = (title: string) => {
    return !title.trim() ? "제목을 입력하세요" : "";
};
