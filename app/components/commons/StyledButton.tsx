"use client";
import styled from "styled-components";
import { COLORS } from "@/public/styles/colors";

interface StyledButtonProps {
  isBorder?: boolean;
  buttonText: string;
  action?: any;
  link?: string;
}

const StyledButton: React.FC<StyledButtonProps> = ({
  isBorder,
  buttonText,
  action,
  link,
}) => {
  return (
    isBorder && (
      <ButtonContainer isBorder={isBorder}>{buttonText}</ButtonContainer>
    )
  );
};

const ButtonContainer = styled.button<{ isBorder?: boolean }>`
  width: 100%;
  ${(props) =>
    props.isBorder &&
    props.isBorder === true &&
    `border: 2px solid ${COLORS.mainColor}`};
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
  font-size: 12px;
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
