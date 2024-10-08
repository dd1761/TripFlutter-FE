"use client";
import DefaultLayout from "./components/DefaultLayout";
import { COLORS } from "@/public/styles/colors";
import styled from "styled-components";
import LocationThumbNailCard from "./components/main/LocationThumbNailCard";

const Home: React.FC = () => {
  const DUMMY_LOCATION: string[] = [
    "서울",
    "경기",
    "강원",
    "충북",
    "충남",
    "전북",
    "전남",
    "제주",
  ];

  return (
    <DefaultLayout top={0} right={0} bottom={0} left={0}>
      <HomeContainer>
        <Header>TripFlutter</Header>
      </HomeContainer>

      <LocationContainer>
        {DUMMY_LOCATION.map((location: string, index: number) => (
          <LocationThumbNailCard
            key={location + index}
            locationName={location}
          />
        ))}
      </LocationContainer>

      <ContentsContainer>
        <ContentsTitle>바로 여행 계획하기</ContentsTitle>
        <StyledButton
          isBorder={true}
          buttonText="트리플러터에게 가고 싶은 여행을 알려주세요!"
        />
      </ContentsContainer>

      <ContentsContainer>
        <ContentsTitle>지금 가장 인기있는 국내 여행지</ContentsTitle>
        <PopularLocationCard />
        <PopularLocationCard />
        <PopularLocationCard />
      </ContentsContainer>
    </DefaultLayout>
  );
};


const StyledButton: React.FC<StyledButtonProps> = ({
  isBorder,
  buttonText,
}) => {
  return (
    isBorder && (
      <ButtonContainer isBorder={isBorder}>{buttonText}</ButtonContainer>
    )
  );
};

const PopularLocationCard: React.FC = () => {
  return (
    <PopularLocationCardContainer>
      <LocationImage />
      <LocationTitle>
        <span>1.</span> 강원도 정선
      </LocationTitle>
      <TagList>
        <Tag tagText={"하이원리조트"} />
        <Tag tagText={"하이원리조트"} />
        <Tag tagText={"하이원리조트"} />
      </TagList>
    </PopularLocationCardContainer>
  );
};

const Tag: React.FC<TagProps> = ({ tagText }) => {
  return (
    <TagContainer>
      <span>#</span>
      {tagText}
    </TagContainer>
  );
};

interface StyledButtonProps {
  isBorder?: boolean;
  buttonText: string;
}

interface TagProps {
  tagText: string;
}

const TagList = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

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

const HomeContainer = styled.div`
  width: calc(100% - 40px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  padding: 20px;
`;

const Header = styled.div`
  font-size: 32px;
  font-weight: 700;
  line-height: 32px;
  color: ${COLORS.mainColor};
`;

const LocationContainer = styled.div`
  padding: 20px;

  display: flex;
  align-items: center;
  gap: 16px;

  overflow-x: scroll;
  overflow-y: hidden;
  white-space: no-wrap;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */

  &::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
`;

const ContentsContainer = styled.div`
  width: calc(100% - 40px);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ContentsTitle = styled.div`
  font-size: 20px;
  line-height: 20px;
  font-weight: 700;
`;

export default Home;
