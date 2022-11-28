// const SignUpForm = () => {
//     const [userId, onChangeUserId, userIdError] = useInput(idValidator);
//     const [password, onChangePassword, passwordError] = useInput(passwordValidator);
//     const [region, setRegion] = useState<Address | null>(null);
//     const [confirmPassword, onChangeConfirmPassword, confirmPasswordError] = useInput(
//         confirmPasswordValidator(String(password)),
//     );
//     const { post } = useHttpPost();
//     const { pace, onChangeMinute, onChangeSecond } = usePaceInput();
//     const navigate = useNavigate();

//     const checkFormValidation = () => confirmPassword && password && userId && region?.address.h_code;

//     const onSubmitSignUp = async () => {
//         if (!checkFormValidation()) return;
//         const userInfo = { userId, password, hCode: region?.address.h_code, pace: pace.minute * 60 + pace.second };
//         try {
//             await post("/user", userInfo);
//             navigate("/", { replace: true });
//         } catch (error: any) {
//             alert(error.message);
//         }
//     };
//     return (
//         <Form>
//             <Input placeholder={PLACEHOLDER.ID} type="text" onChange={onChangeUserId}></Input>
//             <span>{userIdError}</span>
//             <Input placeholder={PLACEHOLDER.PASSWORD} type="password" onChange={onChangePassword}></Input>
//             <span>{passwordError}</span>
//             <Input
//                 placeholder={PLACEHOLDER.CONFIRM_PASSWORD}
//                 type="password"
//                 onChange={onChangeConfirmPassword}
//             ></Input>
//             <span>{confirmPasswordError}</span>
//             <PaceInput onChangeMinute={onChangeMinute} onChangeSecond={onChangeSecond}></PaceInput>
//             <AddressSearchInput setRegion={setRegion} />
//             <Button width="fill" onClick={onSubmitSignUp}>
//                 회원가입
//             </Button>
//         </Form>
//     );
// };

// export default SignUpForm;
export {};
