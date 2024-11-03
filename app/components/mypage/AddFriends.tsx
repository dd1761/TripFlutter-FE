"use client";
import { COLORS } from "@/public/styles/colors";
import { styled } from "styled-components";
import { SetStateAction, useEffect, useState } from "react";

interface AddFriendsModalProps {
  setIsClickedAddFriends: React.Dispatch<SetStateAction<boolean>>;
}
const AddFriends: React.FC<AddFriendsModalProps> = ({
  setIsClickedAddFriends,
}) => {
  const [isActiveButton, setIsActiveButton] = useState<boolean>(false);
  const [friendsCode, setFriendsCode] = useState<string>("");
  const fourDigitCodeRegex = /^\d{4}$/;

  useEffect(() => {
    if (fourDigitCodeRegex.test(friendsCode)) {
      setIsActiveButton(true);
    } else {
      setIsActiveButton(false);
    }
  }, [friendsCode]);

  const buttonClickHandler = () => {
    // 이곳에 친구 신청 API 호출 핸들링
    alert("친구 신청이 완료되었습니다.");
    setIsClickedAddFriends(false);
  };

  return (
    <Container>
      <Box>
        <BoxContainer>
          <div className="modal-title">친구 추가하기</div>
          <div className="modal-desc">
            4자리 코드를 통해 친구 신청을 보낼 수 있습니다.
          </div>
          <input
            type="text"
            placeholder="4자리 숫자 코드 입력"
            onChange={(e) => {
              setFriendsCode(e.target.value);
            }}
          />
          <Button $isActive={isActiveButton} onClick={buttonClickHandler}>
            친구 신청
          </Button>
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
  height: 200px;

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

const Button = styled.button<{ $isActive: boolean }>`
  all: unset;

  margin-top: 12px;
  padding: 8px 32px;

  font-size: 16px;
  font-weight: 700;
  line-height: 16px;

  border: ${({ $isActive }) =>
    $isActive
      ? `2px solid ${COLORS.mainColor}`
      : `2px solid ${COLORS.greyColor}`};
  border-radius: 16px;
  color: ${({ $isActive }) =>
    $isActive ? `${COLORS.mainColor}` : `${COLORS.greyColor}`};

  &:hover {
    cursor: ${({ $isActive }) => ($isActive ? "pointer" : "not-allowed")};
  }
`;

export default AddFriends;
