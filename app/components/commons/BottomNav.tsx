"use client";
import styled from "styled-components";
import { COLORS } from "@/public/styles/colors";
import { PaperPlane, Community, GoHome, Suitcase, UserIcon } from "./Icons";
import { useRouter, usePathname } from "next/navigation";

interface NavInfo {
  name: string;
  route: string;
  img: React.ReactNode;
}

const BottomNav: React.FC = () => {
  const router = useRouter();
  const currentPath = usePathname();

  return (
    <NavContainer>
      <ItemContainer
        onClick={() => {
          router.push("/trip/create");
        }}
      >
        <PaperPlane
          color={
            currentPath === "/trip/create" ? COLORS.mainColor : COLORS.greyColor
          }
          width={28}
          height={28}
        />
        <ItemTitle
          $color={
            currentPath === "/trip/create"
              ? COLORS.blackColor
              : COLORS.greyColor
          }
        >
          여행 계획
        </ItemTitle>
      </ItemContainer>

      <ItemContainer
        onClick={() => {
          router.push("/community");
        }}
      >
        <Community
          color={
            currentPath === "/community" ? COLORS.mainColor : COLORS.greyColor
          }
          width={28}
          height={28}
        />
        <ItemTitle
          $color={
            currentPath === "/community" ? COLORS.blackColor : COLORS.greyColor
          }
        >
          커뮤니티
        </ItemTitle>
      </ItemContainer>

      <ItemContainer
        onClick={() => {
          router.push("/");
        }}
      >
        <GoHome
          color={currentPath === "/" ? COLORS.mainColor : COLORS.greyColor}
          width={28}
          height={28}
        />
        <ItemTitle
          $color={currentPath === "/" ? COLORS.blackColor : COLORS.greyColor}
        >
          홈
        </ItemTitle>
      </ItemContainer>

      <ItemContainer
        onClick={() => {
          router.push("/mypage/trip");
        }}
      >
        <Suitcase
          color={
            currentPath === "/mypage/trip" ? COLORS.mainColor : COLORS.greyColor
          }
          width={28}
          height={28}
        />
        <ItemTitle
          $color={
            currentPath === "/mypage/trip"
              ? COLORS.blackColor
              : COLORS.greyColor
          }
        >
          내 여행
        </ItemTitle>
      </ItemContainer>

      <ItemContainer
        onClick={() => {
          router.push("/mypage");
        }}
      >
        <UserIcon
          color={
            currentPath === "/mypage" ? COLORS.mainColor : COLORS.greyColor
          }
          width={28}
          height={28}
        />
        <ItemTitle
          $color={
            currentPath === "/mypage" ? COLORS.blackColor : COLORS.greyColor
          }
        >
          마이페이지
        </ItemTitle>
      </ItemContainer>
    </NavContainer>
  );
};

const NavContainer = styled.div`
  position: fixed;
  left: 50%;
  bottom: 0;
  z-index: 6;

  transform: translate(-50%, 0);

  display: flex;
  align-items: center;
  justify-content: space-between;

  min-width: 264px;
  max-width: 544px;
  width: calc(100% - 56px);
  height: 58px;
  padding: 8px 28px;

  background-color: ${COLORS.whiteColor};
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.3);
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

const ItemTitle = styled.div<{ $color: string }>`
  font-size: 12px;
  line-height: 12px;
  font-weight: 700;
  color: ${(props) => props.$color};
`;

export default BottomNav;
