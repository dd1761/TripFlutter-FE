"use client";
import styled from "styled-components";
import { COLORS } from "@/public/styles/colors";

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
      <LocationThumbnail />
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
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: ${COLORS.greyColor};
`;

const LocationName = styled.div`
  font-size: 12px;
  line-height: 12px;
  font-weight: 500;
`;

export default LocationThumbNailCard;
