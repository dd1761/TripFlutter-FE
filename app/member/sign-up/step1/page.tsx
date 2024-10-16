"use client";
import styled from "styled-components";
import DefaultLayout from "@/app/components/DefaultLayout";
import { COLORS } from "@/public/styles/colors";
import Image from "next/image";
import Logo from "/public/images/logos/Trip-Flutter.png";
import CommonHeader from "@/app/components/commons/CommonHeader";
import StyledButton from "@/app/components/commons/StyledButton";

const SignUpPage: React.FC = () => {
  return (
    <DefaultLayout top={0} right={0} bottom={0} left={0} nav={false}>
      <SignupContainer>
        <CommonHeader backLink={"/"} headerTitle={"회원가입"} />

        <SignupContentsContainer>
          <LogoContainer>
            <LogoWrapper>
              <Image
                src={Logo}
                layout="responsive"
                width={200}
                height={50}
                sizes="(max-width: 320px) 50vw, 320px"
                alt={"logo"}
                priority={true}
              />
            </LogoWrapper>
            <PageTitle>개인정보 처리 방침</PageTitle>
          </LogoContainer>

          <PrivacyPolicyContainer>
            이곳에 개인정보 처리방침 텍스트
          </PrivacyPolicyContainer>
          <StyledButton
            isBorder={false}
            buttonText={"동의하고 계속"}
            fontSize={20}
            link={"/meber/sign-up/step2"}
          />
        </SignupContentsContainer>
      </SignupContainer>
    </DefaultLayout>
  );
};

const SignupContainer = styled.div`
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

const SignupContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  gap: 32px;

  width: calc(100% - 40px);

  /* margin-top: 200px; */
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const PageTitle = styled.div`
  font-size: 20px;
  line-height: 20px;
  font-weight: 700;
`;

const LogoWrapper = styled.div`
  width: 60%;
`;

const PrivacyPolicyContainer = styled.div`
  padding: 24px;
  width: calc(100% - 50px);
  min-height: 60dvh;
  border: 1px solid ${COLORS.greyColor};
  border-radius: 8px;

  overflow-y: auto;
`;

export default SignUpPage;
