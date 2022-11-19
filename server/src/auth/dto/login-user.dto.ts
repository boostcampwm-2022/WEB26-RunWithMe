export class LoginUserDto {
    private userId: string;
    private password: string;

    getUserId() {
        return this.userId;
    }

    getPassword() {
        return this.password;
    }
}
