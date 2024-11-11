"use client";
import { COLORS } from "@/public/styles/colors";
import { styled } from "styled-components";
import LoadingSpinner from "./LoadingSpinner";

const LoadingModal = ({ message = "불러오는 중입니다." }) => {
  return (
    <Container>
      <Box>
        <BoxContainer>
          <p>
            {message}
            <br />
            잠시만 기다려주세요.
          </p>
          <LoadingSpinner />
        </BoxContainer>
      </Box>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;

  z-index: 99;

  width: 100vw;
  height: 100vh;

  background-color: rgba(0, 0, 0, 0.5);
`;

const Box = styled.div`
  width: 420px;
  height: 288px;

  border-radius: 16px;
  background: ${COLORS.whiteColor};
`;

const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;

  height: 100%;

  box-sizing: border-box;

  padding: 50px 24px;

  & > p {
    color: ${COLORS.mainColor};
    text-align: center;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 32px; /* 160% */
  }
`;

export default LoadingModal;
