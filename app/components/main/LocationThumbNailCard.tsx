"use client";
import styled from "styled-components";
import { COLORS } from "@/public/styles/colors";
import Image from "next/image";
import DUMMY_THUMB from "/public/images/dummy_seoul.jpeg";

interface LocationRankCardProps {
  img?: string;
  locationName: string;
}

const LocationThumbNailCard: React.FC<LocationRankCardProps> = ({
  img,
  locationName,
}) => {
  return (
    <LocationCardContainer>
      <LocationThumbnail>
        <Image
          src={DUMMY_THUMB}
          alt={locationName}
          layout="fill"
          loading="lazy"
          objectFit="cover"
          style={{ borderRadius: "50%" }}
        />
      </LocationThumbnail>
      <LocationName>{locationName}</LocationName>
    </LocationCardContainer>
  );
};

const LocationCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const LocationThumbnail = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 50%;

  & > img {
  }
`;

const LocationName = styled.div`
  font-size: 12px;
  line-height: 12px;
  font-weight: 500;
`;

export default LocationThumbNailCard;
