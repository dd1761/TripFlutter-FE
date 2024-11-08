"use client";
import Image from "next/image";
import styled from "styled-components";
import { COLORS } from "@/public/styles/colors";
import DUMMY_UDO from "/public/images/dummy_udo.png";

interface ReviewCardProps {
  reviewTitle: string;
  reviewRating: string;
  reviewImg: string;
  reviewDesc: string;
}

const ReviewCard: React.FC = () => {
  return (
    <CardContainer>
      <ThumbnailContainer>
        <Image src={DUMMY_UDO} layout="fill" alt={"review-thumbnail"} />
      </ThumbnailContainer>
      <ContentContainer>
        <div className={"reivew-title"}>
          <div className={"title"}>여행지명123123</div>
          <div className={"rating"}>3.8 / 5.0</div>
        </div>
        <div className={"review-desc"}>
          <p>
            여기에는 리뷰 내용이 들어가는데 두줄까지만 표시가 되고 그 이상은
            말줄임표로 줄입니다
          </p>
        </div>
      </ContentContainer>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  flex: 0 0 auto;
  /* display: flex; */
  flex-direction: column;
  align-items: center;

  width: 140px;
  height: 180px;

  border: 1px solid ${COLORS.greyColor};
  border-radius: 8px;
`;

const ThumbnailContainer = styled.div`
  position: relative;

  width: 100%;
  height: 50%;

  border-radius: 8px 8px 0px 0px;
  overflow: hidden;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  padding: 12px;
  width: calc(100% - 24px);
  height: 50%;

  & > .reivew-title {
    display: flex;
    align-items: flex-end;
    gap: 4px;
    width: 100%;

    & > .title {
      width: 55%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    font-size: 16px;
    font-weight: 700;

    & > .rating {
      font-size: 12px;
      font-weight: 500;
    }
  }

  & > .review-desc {
    width: 100%;

    & > p {
      width: 100%;

      font-size: 12px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;

      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;

export default ReviewCard;
