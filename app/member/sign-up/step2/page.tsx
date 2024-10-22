"use client";
import styled from "styled-components";
import DefaultLayout from "@/app/components/DefaultLayout";
import { COLORS } from "@/public/styles/colors";
import Image from "next/image";
import Logo from "/public/images/logos/Trip-Flutter.png";
import CommonHeader from "@/app/components/commons/CommonHeader";
import StyledButton from "@/app/components/commons/StyledButton";
import { useForm, SubmitHandler } from "react-hook-form";

interface SignUpInput {
  email: string;
  password: string;
  passwordChk: string;
  nickname: string;
  likeLocations: string[];
}

const SignUpPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpInput>();

  const onSubmit: SubmitHandler<SignUpInput> = (data: SignUpInput) => {
    alert(
      `회원가입 처리 필요! \n 이메일 : ${data.email} \n 패스워드 : ${data.password} \n 닉네임 : ${data.nickname} \n 선호장소 : ${data.likeLocations}`
    );
  };

  const emailChkHandler = () => {
    alert(`이메일 중복 확인 처리 필요!`);
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
            <InputContainer>
              <div className={"input-title"}>이메일</div>
              <div className={"input-and-button"}>
                <input
                  type="text"
                  placeholder="이메일 입력"
                  {...register("email")}
                />
                <StyledButton
                  isBorder={false}
                  buttonText={"중복확인"}
                  fontSize={14}
                  action={() => {
                    emailChkHandler();
                  }}
                />
              </div>
            </InputContainer>

            <InputContainer>
              <div className={"input-title"}>패스워드</div>
              <input
                type="text"
                placeholder="패스워드 입력"
                {...register("password")}
              />
            </InputContainer>

            <InputContainer>
              <div className={"input-title"}>패스워드 확인</div>
              <input
                type="text"
                placeholder="동일한 패스워드를 입력하세요"
                {...register("passwordChk")}
              />
            </InputContainer>

            <InputContainer>
              <div className={"input-title"}>닉네임</div>
              <input
                type="text"
                placeholder="닉네임 입력"
                {...register("nickname")}
              />
            </InputContainer>
            <input type="submit" />
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

const StyledForm = styled.form`
  width: calc(100% - 40px);

  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;

  & > .input-title {
    font-size: 20px;
    line-height: 20px;
    font-weight: 700;
    color: ${COLORS.blackColor};
  }

  & > .input-and-button {
    display: flex;
    gap: 12px;
    align-items: center;

    width: 105%;

    & > input {
      all: unset;
      width: 90%;
      padding: 8px 16px;
      border-radius: 8px;
      border: solid 1px ${COLORS.greyColor};
    }

    & > button {
      width: 30%;
    }
  }

  input {
    all: unset;

    width: 100%;
    padding: 8px 16px;
    border-radius: 8px;
    border: solid 1px ${COLORS.greyColor};
  }

  input ::placeholder {
    font-size: 16px;
    font-weight: 700;
    color: ${COLORS.greyColor};
  }

  input[type="submit"] {
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

  input[type="submit"]:hover {
    background-color: ${COLORS.whiteColor};
    color: ${COLORS.mainColor};
    transition: 0.2s;
  }
`;

export default SignUpPage;
