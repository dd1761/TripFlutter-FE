"use client";
import styled from "styled-components";
import DefaultLayout from "../components/DefaultLayout";
import { COLORS } from "@/public/styles/colors";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import CommonHeader from "../components/commons/CommonHeader";
import Link from "next/link";
import { Pencil } from "../components/commons/Icons";
import LoadingModal from "../components/commons/LoadingModal";
import DataTable from "../components/commons/DataTable";

const MyPageIntroPage: React.FC = () => {
  const router = useRouter();
  const user = useSelector((state: any) => state.user.user);

  useEffect(() => {
    if (user.isLogin === false) {
      alert("로그인 후 이용 가능한 서비스입니다. 로그인 페이지로 이동합니다.");
      router.replace("/member/log-in");
    }
  }, []);

  return (
    <DefaultLayout top={0} right={0} bottom={0} left={0} nav={true}>
      <MyPageContainer>
        <CommonHeader backLink={"/"} headerTitle={"마이페이지"} />

        <Contents>
          <ProfileContainer>
            <BasicProfile>
              <ProfileImage />
              <ProfileInfo>
                <div className={"user-name"}>
                  {user.nickname} (#{user.id})
                </div>
                <div className={"user-desc"}>{user.desc}</div>
              </ProfileInfo>
            </BasicProfile>
            <EditButton href={"/mypage/"}>
              정보 수정{" "}
              <Pencil width={16} height={16} color={COLORS.mainColor} />
            </EditButton>
          </ProfileContainer>

          <TableContainer>
            <TableTitle>최근 내 여정</TableTitle>
            {/* TODO : 테이블 구현 */}
            <DataTable
              columns={[
                { key: "date", label: "날짜" },
                { key: "destination", label: "목적지" },
                { key: "duration", label: "기간" },
              ]}
              data={[
                { date: "2023-01-01", destination: "서울", duration: "3일" },
                { date: "2023-02-15", destination: "부산", duration: "2일" },
                { date: "2023-03-10", destination: "제주도", duration: "5일" },
              ]}
            />
          </TableContainer>

          <TableContainer>
            <TableTitle>내 리뷰</TableTitle>
            {/* TODO : 테이블 구현 */}
            <DummyTable>아직 남긴 리뷰가 없습니다.</DummyTable>
          </TableContainer>

          <TableContainer>
            <TableTitle>
              내 친구{" "}
              <FriendAddButton
                onClick={() => {
                  alert("친구 추가");
                }}
              >
                친구 추가
              </FriendAddButton>
            </TableTitle>

            {/* TODO : 테이블 구현 */}
            <DummyTable>아직 추가한 친구가 없습니다.</DummyTable>
          </TableContainer>
        </Contents>
      </MyPageContainer>
    </DefaultLayout>
  );
};

const MyPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  min-width: 320px;
  max-width: 600px;
  width: 100%;
  height: 100%;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 36px;

  width: calc(100% - 40px);

  /* margin-top: 200px; */
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: calc(100% - 40px);
`;

const BasicProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const ProfileImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: ${COLORS.greyColor};
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  & > .user-name {
    font-size: 24px;
    font-weight: 900;
    color: ${COLORS.blackColor};
  }

  & > .user-desc {
    width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: wrap;
    font-size: 16px;
    font-weight: 500;
    color: ${COLORS.blackColor};
  }
`;

const EditButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;

  padding: 8px;

  background-color: ${COLORS.whiteColor};
  color: ${COLORS.mainColor};
  text-align: center;

  border: 1px solid ${COLORS.greyColor};
  border-radius: 16px;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
`;

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  width: calc(100% - 40px);
`;

const TableTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  font-size: 24px;
  font-weight: 700;
  line-height: 24px;
`;

const DummyTable = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 16px;
  width: calc(100% - 32px);
  border: 1px solid ${COLORS.greyColor};
  border-radius: 8px;

  font-size: 20px;
  font-weight: 700;
  line-height: 20px;
  color: ${COLORS.mainColor};

  & > .friend-title {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
`;

const FriendAddButton = styled.button`
  all: unset;

  padding: 8px 16px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 14px;
  font-weight: 700;
  line-height: 14px;

  border-radius: 16px;
  border: 1px solid ${COLORS.greyColor};
  color: ${COLORS.mainColor};

  &:hover {
    cursor: pointer;
  }
`;

export default MyPageIntroPage;
