"use client";
import styled from "styled-components";
import DefaultLayout from "@/app/components/DefaultLayout";
import { COLORS } from "@/public/styles/colors";
import { ArrowLeft } from "@/app/components/commons/Icons";

import Link from "next/link";

const SignUpPage: React.FC = () => {
  return (
    <DefaultLayout top={0} right={0} bottom={0} left={0} nav={false}>
      <SignUpPageContainer>
        <Header>
          <BackButton href={"/"}>
            <ArrowLeft width={16} height={16} color={COLORS.blackColor} />
          </BackButton>
          <Title>회원가입</Title>
        </Header>
      </SignUpPageContainer>
    </DefaultLayout>
  );
};

const SignUpPageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  min-width: 320px;
  max-width: 600px;
  width: 100%;
  height: 100%;
`;

const Header = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  width: calc(100% - 40px);
  padding: 20px;
`;

const Title = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  font-size: 20px;
  font-weight: 700;
  color: ${COLORS.blackColor};
`;

const BackButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 40px;
  height: 40px;

  all: unset;
  cursor: pointer;
  text-decoration: none;
`;

export default SignUpPage;
