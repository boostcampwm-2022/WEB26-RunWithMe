interface PostUserBody {
    userId: string;
    password: string;
    hCode: string;
    pace?: number;
    email: string;
    receiveMail: boolean;
}

export default PostUserBody;
