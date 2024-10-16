"use client";
import styled from "styled-components";
import DefaultLayout from "@/app/components/DefaultLayout";
import { COLORS } from "@/public/styles/colors";
import Image from "next/image";

import CommonHeader from "@/app/components/commons/CommonHeader";


const SignUpPage: React.FC = () => {
  return (
  <DefaultLayout top={0} right={0} bottom={0} left={0} nav={false}>
    <SignupContainer>
      <CommonHeader backLink={"/"} headerTitle={"회원가입"}/>
    </SignupContainer>
  </DefaultLayout>);
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

export default SignUpPage;
