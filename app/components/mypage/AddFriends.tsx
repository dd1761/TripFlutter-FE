"use client";
import { COLORS } from "@/public/styles/colors";
import { styled } from "styled-components";

const AddFriends = () => {
  return (
    <Container>
      <Box>
        <BoxContainer>
          <div className="modal-title">친구 추가하기</div>
          <div className="modal-desc">
            4자리 코드를 통해 친구 신청을 보낼 수 있습니다.
          </div>
          <input type="text" placeholder="4자리 숫자 코드 입력" />
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
  height: 160px;

  border-radius: 16px;
  background: ${COLORS.whiteColor};
`;

const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;

  height: 100%;

  box-sizing: border-box;

  padding: 50px 24px;

  & > .modal-title {
    color: ${COLORS.mainColor};
    text-align: center;
    font-size: 20px;
    font-style: normal;
    font-weight: 900;
    line-height: 20px; /* 160% */
  }

  & > input {
    all: unset;
    width: 80%;
    padding: 8px 12px;
    font-size: 14px;
    line-height: 14px;
    border-radius: 8px;
    border: 1px solid ${COLORS.greyColor};
  }
`;

export default AddFriends;
