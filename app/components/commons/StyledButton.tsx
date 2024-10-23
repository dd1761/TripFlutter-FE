"use client";
import styled from "styled-components";
import { COLORS } from "@/public/styles/colors";
import { useRouter } from "next/navigation";

interface StyledButtonProps {
  isBorder: boolean;
  isActive?: boolean;
  buttonText: string;
  action?: () => void;
  fontSize: number;
}

const StyledButton: React.FC<StyledButtonProps> = ({
  isBorder,
  buttonText,
  action,
  fontSize,
  isActive,
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
        action && action();
      }}
      isActive={isActive !== undefined ? isActive : true}
    >
      {buttonText}
    </ButtonContainer>
  );
};

const ButtonContainer = styled.button<{
  isBorder: boolean;
  fontSize: number;
  isActive: boolean;
}>`
  width: 100%;
  pointer-events: ${(props) => (props.isActive ? "auto" : "none")};
  opacity: ${(props) => (props.isActive ? 1 : 0.5)};
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
