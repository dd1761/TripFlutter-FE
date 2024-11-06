"use client";
import styled from "styled-components";
import DefaultLayout from "@/app/components/DefaultLayout";
import { COLORS } from "@/public/styles/colors";
import Image from "next/image";
import Logo from "/public/images/logos/Trip-Flutter.png";
import CommonHeader from "@/app/components/commons/CommonHeader";
import StyledButton from "@/app/components/commons/StyledButton";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
interface SignUpInput {
  email: string;
  password: string;
  passwordChk: string;
  nickname: string;
}

interface SelectOptions {
  value: string;
  label: string;
}

const LIKE_LOCATIONS: SelectOptions[] = [
  { value: "강원도", label: "강원도" },
  { value: "경기도", label: "경기도" },
  { value: "서울", label: "서울" },
  { value: "충청도", label: "충청도" },
  { value: "경상도", label: "경상도" },
  { value: "전라도", label: "전라도" },
];

const SignUpPage: React.FC = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$&])[A-Za-z\d!@#$&]{8,}$/;
  const nicknameRegex = /^[가-힣a-zA-Z0-9]+$/;

  // 각 항목 중복 검사 혹은 정규식 검사에 따른 안내 메시지 states
  const [emailChk, setEmailChk] = useState<string | undefined>();
  const [passwordValid, setPasswordValid] = useState<string | undefined>();
  const [passwordValidChk, setPasswordValidChk] = useState<
    string | undefined
  >();
  const [nicknameValid, setNicknameValid] = useState<string | undefined>();

  // react-form-hook
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpInput>();

  // router
  const router = useRouter();

  const onSubmit: SubmitHandler<SignUpInput> = (data: SignUpInput) => {
    alert(
      `회원가입 처리 필요! \n 이메일 : ${data.email} \n 패스워드 : ${data.password} \n 닉네임 : ${data.nickname}`
    );
    router.push("/member/sign-up/complete");
  };

  const emailChkHandler = () => {
    alert(`이메일 중복 확인 처리 필요!`);
    //TODO
    // 이메일 정규식 검사 후 참일시 이메일 중복 검사 API 호출
    // 이메일 정규식 검사 실패시
    // -> 올바른 이메일 형식을 입력하라는 안내 input 하단에 표시할것
    // 이메일 정규식 검사 성공 && 이메일 중복 검사 실패
    // -> 이미 가입된 계정이므로 로그인 페이지로 이동하라는 안내 input 하단에 표시할것
    // 이메일 정규식 검사 성공 && 이메일 중복 검사 성공
    // -> 사용 가능한 이메일입니다 안내 input 하단에 표시할것
  };

  const nicknameChkHandler = () => {
    // TODO
    // 닉네임 정규식 검사 후 참일시 닉네임 중복 검사 API 호출
    // 닉네임 정규식 검사 실패시
    // -> 닉네임은 한글, 영대소문자, 숫자만 사용 가능하다는 안내 input 하단에 표시할것
    // 닉네임 정규식 검사 성공 && 닉네임 중복 검사 실패
    // -> 중복되어 사용할 수 없다는 안내 input 하단에 표시할것
    // 닉네임 정규식 검사 성공 && 닉네임 중복 검사 성공
    // -> 사용 가능한 닉네임입니다 안내 input 하단에 표시할것.
  };

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
          </LogoContainer>

          <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <InputContainer isButton={true}>
              <div className={"input-title"}>이메일</div>
              <div className={"input-with-button"}>
                <input
                  type="text"
                  placeholder="이메일 입력"
                  {...register("email")}
                />
                <div className={"button-container"}>
                  <StyledButton
                    isBorder={false}
                    fontSize={16}
                    buttonText={"중복확인"}
                    action={emailChkHandler}
                  />
                </div>
              </div>
            </InputContainer>

            <InputContainer isButton={false}>
              <div className={"input-title"}>비밀번호</div>
              <input
                type="password"
                placeholder="비밀번호 입력"
                {...register("password")}
              />
            </InputContainer>

            <InputContainer isButton={false}>
              <div className={"input-title"}>비밀번호 확인</div>
              <input
                type="password"
                placeholder="동일한 비밀번호 입력"
                {...register("passwordChk")}
              />
            </InputContainer>

            <InputContainer isButton={true}>
              <div className={"input-title"}>닉네임</div>
              <div className={"input-with-button"}>
                <input
                  type="text"
                  placeholder="닉네임 입력"
                  {...register("nickname")}
                />
                <div className={"button-container"}>
                  <StyledButton
                    isBorder={false}
                    fontSize={16}
                    buttonText={"중복확인"}
                    action={emailChkHandler}
                  />
                </div>
              </div>
            </InputContainer>
            <input type="submit" value={"다음으로"} />
          </StyledForm>
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
  align-items: center;
  gap: 32px;

  width: calc(100% - 40px);
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: calc(100% - 40px);
`;

const LogoWrapper = styled.div`
  width: 80%;
`;

const StyledForm = styled.form`
  width: calc(100% - 40px);

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;

  & > input[type="submit"] {
    all: unset;
    padding: 12px 16px;
    margin-top: 52px;
    border-radius: 8px;
    border: 2px solid ${COLORS.mainColor};
    background-color: ${COLORS.mainColor};
    color: ${COLORS.whiteColor};
    text-align: center;
    cursor: pointer;
    font-size: 16px;
    font-weight: 700;
    width: calc(100% - 32px);
  }

  & > input[type="submit"]:hover {
    background-color: ${COLORS.whiteColor};
    color: ${COLORS.mainColor};
    transition: 0.2s;
  }
`;

const InputContainer = styled.div<{ isButton: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;

  & > .input-with-button {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .input-title {
    font-size: 20px;
    line-height: 20px;
    font-weight: 700;
    color: ${COLORS.blackColor};
  }

  .button-container {
    width: 30%;
  }

  input {
    all: unset;
    width: ${(props) => (props.isButton ? "70%" : "calc(100% - 32px)")};
    padding: 8px 16px;
    border-radius: 8px;
    border: solid 1px ${COLORS.greyColor};
  }

  input::placeholder {
    font-size: 16px;
    font-weight: 700;
    color: ${COLORS.greyColor};
  }
`;

export default SignUpPage;
