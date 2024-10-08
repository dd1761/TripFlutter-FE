"use client";
import styled from "styled-components";
import { COLORS } from "@/public/styles/colors";

interface TagProps {
  tagText: string;
}

const Tag: React.FC<TagProps> = ({ tagText }) => {
  return (
    <TagContainer>
      <span>#</span>
      {tagText}
    </TagContainer>
  );
};

const TagContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;

  font-size: 12px;
  font-weight: 500;
  border-radius: 16px;
  border: 1px solid ${COLORS.greyColor};

  & > span {
    color: ${COLORS.mainColor};
    font-weight: 700;
  }
`;

export default Tag;
