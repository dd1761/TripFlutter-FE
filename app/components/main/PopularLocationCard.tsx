"use client";
import styled from "styled-components";
import { COLORS } from "@/public/styles/colors";

import Tag from "../commons/Tag";

interface PopularLocationCardProps {
  img?: string;
  rank: number;
  locationName: string;
  tags: string[];
}

const PopularLocationCard: React.FC<PopularLocationCardProps> = ({
  img,
  rank,
  locationName,
  tags,
}) => {
  return (
    <PopularLocationCardContainer>
      <LocationImage />
      <LocationTitle>
        <span>{rank}.</span> {locationName}
      </LocationTitle>
      <TagList>
        {tags.map((tag: string, index: number) => (
          <Tag key={tag + index} tagText={tag} />
        ))}
      </TagList>
    </PopularLocationCardContainer>
  );
};

const PopularLocationCardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const LocationImage = styled.div`
  width: 100%;
  height: 200px;
  background-color: ${COLORS.greyColor};
  border-radius: 8px;
`;

const LocationTitle = styled.div`
  font-size: 20px;
  line-height: 20px;
  font-weight: 700;

  & > span {
    color: ${COLORS.mainColor};
  }
`;

const TagList = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export default PopularLocationCard;
