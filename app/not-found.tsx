"use client";
import Image from "next/image";
import styled from "styled-components";
import { COLORS } from "@/public/styles/colors";
import DefaultLayout from "./components/DefaultLayout";
import Link from "next/link";

const NotFound: React.FC = () => {
  return (
    <DefaultLayout top={0} right={0} bottom={0} left={0} nav={false}>
      <NotFoundContainer>
        <Image
          src={"/images/airplane.png"}
          alt={"404 not found"}
          width={150}
          height={158}
        />

        <NotFoundContents>
          <div className={"not-found"}>404 NOT FOUND</div>
          <div className={".not-found-message"}>
            요청하신 페이지를 찾지 못했습니다.
          </div>
          <Link href={"/"}>홈으로 돌아가기 &gt;</Link>
        </NotFoundContents>
      </NotFoundContainer>
    </DefaultLayout>
  );
};

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;

  width: 100%;
  min-height: 100dvh;
`;

const NotFoundContents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  & > .not-found {
    font-size: 24px;
    line-height: 24px;
    font-weight: 700;
    color: ${COLORS.mainColor};
  }

  & > .not-found-message {
    text-align: center;
    font-size: 20px;
    line-height: 20px;
    font-weight: 500;
  }

  & > a {
    text-decoration: underline;
  }
`;

export default NotFound;
