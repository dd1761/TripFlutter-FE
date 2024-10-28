"use client";
import styled from "styled-components";
import DefaultLayout from "@/app/components/DefaultLayout";
import Image from "next/image";
import Link from "next/link";
import Logo from "/public/images/logos/Trip-Flutter.png";
import { COLORS } from "@/public/styles/colors";

const SignUpCompletePage: React.FC = () => {
  return (
    <DefaultLayout top={0} right={0} bottom={0} left={0} nav={false}>
      <Container>
        <ContentsContainer>
          <LogoContainer>
            <Image
              src={Logo}
              layout="responsive"
              width={200}
              height={50}
              sizes="(max-width: 600px) 100vw, 600px"
              alt={"logo"}
              priority={true}
            />
          </LogoContainer>

          <p className={"main-content"}>회원가입이 완료되었습니다.</p>
          <p className={"sub-content"}>
            트리플러터와 함께 우리나라의 다채로움에 빠져볼까요?
          </p>
          <Link href={"/"}>트리플러터 메인으로 &gt;</Link>
        </ContentsContainer>
      </Container>
    </DefaultLayout>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: calc(100% - 40px);
  height: 90dvh;
  padding: 20px;
`;

const LogoContainer = styled.div`
  width: 70%;
  margin-bottom: 20px;
`;

const ContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  & > .main-content {
    font-size: 24px;
    line-height: 24px;
    font-weight: 700;
    color: ${COLORS.mainColor};
  }

  & > .sub-content {
    font-size: 16px;
    line-height: 16px;
    font-weight: 500;
    color: ${COLORS.blackColor};
  }

  & > a {
    all: unset;
    text-decoration: underline;
    font-size: 16px;
    line-height: 16px;
    font-weight: 500;
    color: ${COLORS.mainColor};
  }
`;

export default SignUpCompletePage;
