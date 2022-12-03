import { ReactNode } from "react";
import { Container } from "./Layout.styles";

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <Container>
            <div>
                <h1>RunWithMe</h1>
                <ul>
                    <li>나만의 코스로 달려보고 싶으신가요?</li>
                    <li>혼자 뛰는게 지루하신가요?</li>
                    <li>나만의 코스로 함께 달리는 러닝 커뮤니티, RunWithMe를 시작해보세요!</li>
                </ul>
            </div>
            <div>{children}</div>
        </Container>
    );
};

export default Layout;
