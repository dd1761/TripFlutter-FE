import React from 'react';
import styled from 'styled-components';
import { COLORS } from "@/public/styles/colors";

const HeaderLayout: React.FC = () => {
  return (
    <HeaderContainer>
      <Title>TripFlutter</Title>
    </HeaderContainer>
  );
};

export default HeaderLayout;

// Styled Components
const HeaderContainer = styled.div`
  width: calc(100% - 40px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  padding: 20px;
`;

const Title = styled.div`
  font-size: 32px;
  font-weight: 700;
  line-height: 32px;
  color: ${COLORS.mainColor};
`;
