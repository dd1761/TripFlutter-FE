"use client";
import styled from "styled-components";
import { COLORS } from "@/public/styles/colors";
import { useRouter } from "next/navigation";

interface StyledButtonProps {
  isBorder: boolean;
  buttonText: string;
  action?: any;
  link: string;
  fontSize: number;
}

const StyledButton: React.FC<StyledButtonProps> = ({
  isBorder,
  buttonText,
  action,
  link,
  fontSize,
}) => {
  const router = useRouter();

  const buttonClikHandler = (link: string) => {
    router.replace(link);
  };

  return (
    <ButtonContainer
      isBorder={isBorder}
      fontSize={fontSize}
      onClick={() => {
        buttonClikHandler(link);
      }}
    >
      {buttonText}
    </ButtonContainer>
  );
};

const ButtonContainer = styled.button<{ isBorder: boolean; fontSize: number }>`
  width: 100%;
  border: 2px solid ${COLORS.mainColor};
  color: ${(props) =>
    props.isBorder && props.isBorder === true
      ? COLORS.mainColor
      : COLORS.whiteColor};
  background-color: ${(props) =>
    props.isBorder && props.isBorder === true
      ? COLORS.whiteColor
      : COLORS.mainColor};
  border-radius: 8px;
  padding: 8px;
  font-size: ${(props) => `${props.fontSize}px`};
  font-weight: 900;

  &:hover {
    cursor: pointer;
    background-color: ${(props) =>
      props.isBorder && props.isBorder === true
        ? COLORS.mainColor
        : COLORS.whiteColor};
    color: ${(props) =>
      props.isBorder && props.isBorder === true
        ? COLORS.whiteColor
        : COLORS.mainColor};
    transition: 0.2s;
  }
`;

export default StyledButton;
