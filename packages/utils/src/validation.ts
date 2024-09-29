export function validateAuthForm(email: string, password: string, isLogin: boolean, confirmPassword?: string): string | null {
    if (!email || !password) {
        return '모든 필드를 입력해주세요.';
    }
    if (!isLogin) {
        if (password !== confirmPassword) {
            return '비밀번호가 일치하지 않습니다.';
        }
        if (password.length < 10) {
            return '비밀번호는 10자리 이상이어야 합니다.';
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            return '비밀번호에는 특수문자가 포함되어야 합니다.';
        }
    }
    return null;
};
