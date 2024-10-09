"use client";
import styled from "styled-components";
import { COLORS } from "@/public/styles/colors";
import Image, { StaticImageData } from "next/image";
import Tag from "../commons/Tag";

/*
  TODO
  
  StaticImageData는 로컬 이미지를 import하여 next/image를 통해 최적화 하기 위해 사용되므로
  실제 API를 연동할 경우 string으로 수정하여야 하며 next/image 최적화를 다시 진행하여야 함.
*/

interface PopularLocationCardProps {
  img: StaticImageData;
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
      <LocationImage>
        <Image
          src={img}
          alt={locationName}
          layout="fill"
          placeholder="blur"
          objectFit="cover"
          style={{ borderRadius: "8px" }}
        />
      </LocationImage>
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
  position: relative;
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
