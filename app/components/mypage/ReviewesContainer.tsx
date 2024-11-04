"use client";
import styled from "styled-components";
import { COLORS } from "@/public/styles/colors";
import ReviewCard from "./ReviewCard";

const ReviewsContainer: React.FC = () => {
  return (
    <Container>
      <ReviewCard />
      <ReviewCard />
      <ReviewCard />
      <ReviewCard />
      <ReviewCard />
      <ReviewCard />
      <ReviewCard />
      <ReviewCard />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: no-wrap;
  overflow-x: scroll;
  overflow-y: hidden;
  gap: 16px;

  width: 100%;
`;

export default ReviewsContainer;
