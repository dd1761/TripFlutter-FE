"use client";
import Link from "next/link";
import DefaultLayout from "@/app/components/DefaultLayout";
import styled from "styled-components";
import { COLORS } from "@/public/styles/colors";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import Logo from "/public/images/logos/Trip-Flutter.png";
import CommonHeader from "@/app/components/commons/CommonHeader";

/*
  TODO

  - 메인 화면 하단 네비게이션 바에서 '마이페이지' 메뉴 클릭시 '로그인이 필요합니다' 안내 후 로그인 화면으로 이동하는 모달 구현
  - 
*/

interface LoginInput {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginInput>();

  const onSubmit: SubmitHandler<LoginInput> = (data: LoginInput) => {
    alert(
      `로그인 처리 필요! / 로그인 정보 :  이메일 - ${data.email} .. 비밀번호 - ${data.password}`
    );
  };

  return (
    <DefaultLayout top={0} right={0} bottom={0} left={0} nav={false}>
      <LoginContainer>
        <CommonHeader backLink={"/"} headerTitle={"로그인"} />

        <Contents>
          <Image
            src={Logo}
            layout="responsive"
            width={200}
            height={50}
            sizes="(max-width: 600px) 100vw, 600px"
            alt={"logo"}
            priority={true}
          />
          <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <InputContainer>
              <div className={"input-title"}>이메일</div>
              <input
                type="text"
                placeholder="이메일 입력"
                {...register("email")}
              />
            </InputContainer>

            <InputContainer>
              <div className={"input-title"}>비밀번호</div>
              <input
                type="password"
                placeholder="비밀번호 입력"
                {...register("password")}
              />
            </InputContainer>

            <InputContainer>
              <input type="submit" value={"로그인"} />
            </InputContainer>
          </StyledForm>
          <OtherMenu>
            <Link href="/member/find-account">계정 찾기</Link>
            <div> | </div>
            <Link
              href="/member/sign-up/step1"
              style={{ color: `${COLORS.mainColor}`, fontWeight: "700" }}
            >
              회원 가입
            </Link>
          </OtherMenu>
        </Contents>
      </LoginContainer>
    </DefaultLayout>
  );
};

const LoginContainer = styled.div`
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

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;

  width: calc(100% - 40px);

  margin-top: 200px;
`;

const StyledForm = styled.form`
  width: calc(100% - 40px);

  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  & > .input-title {
    font-size: 14px;
    font-weight: 500;
    color: ${COLORS.blackColor};
  }

  & > input {
    all: unset;

    padding: 8px 16px;
    border-radius: 8px;
    border: solid 1px ${COLORS.greyColor};
  }

  & > input ::placeholder {
    font-size: 16px;
    font-weight: 700;
    color: ${COLORS.greyColor};
  }

  & > input[type="submit"] {
    all: unset;
    padding: 12px 16px;
    margin-top: 20px;
    border-radius: 8px;
    border: 2px solid ${COLORS.mainColor};
    background-color: ${COLORS.mainColor};
    color: ${COLORS.whiteColor};
    text-align: center;
    cursor: pointer;
    font-size: 16px;
    font-weight: 700;
  }

  & > input[type="submit"]:hover {
    background-color: ${COLORS.whiteColor};
    color: ${COLORS.mainColor};
    transition: 0.2s;
  }
`;

const OtherMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  margin-top: 8px;

  & > div {
    font-size: 14px;
    font-weight: 500;
  }
`;
export default LoginPage;
