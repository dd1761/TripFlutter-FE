"use client";
import Link from "next/link";
import DefaultLayout from "@/app/components/DefaultLayout";
import styled from "styled-components";
import { COLORS } from "@/public/styles/colors";
import { ArrowLeft } from "@/app/components/commons/Icons";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import Logo from "/public/images/logos/Trip-Flutter.png";

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
        <Header>
          <BackButton href={"/"}>
            <ArrowLeft width={16} height={16} color={COLORS.blackColor} />
          </BackButton>
          <Title>로그인</Title>
        </Header>

        <Contents>
          <LogoContainer>
            <Image
              src={Logo}
              alt={"trip-flutter logo"}
              fill={true}
              priority={true}
              sizes="(max-width: 600px) 100vw, 600px"
            />
          </LogoContainer>
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
              href="/member/sign-up"
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

const Title = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  font-size: 20px;
  font-weight: 700;
  color: ${COLORS.blackColor};
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: calc(100% - 40px);
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

const LogoContainer = styled.div`
  position: relative;
  object-fit: "contain";
`;

export default LoginPage;
