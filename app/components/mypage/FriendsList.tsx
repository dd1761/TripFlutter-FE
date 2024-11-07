"use client";
import styled from "styled-components";
import { COLORS } from "@/public/styles/colors";
import React from "react";
import { useState } from "react";
import Image from "next/image";

export interface Friends {
  profileImg: string;
  userName: string;
  userId: number;
}

interface FriendsListProps {
  friendsList: Friends[];
}

const FriendsList: React.FC<FriendsListProps> = ({ friendsList }) => {
  const [visibleCount, setVisibleCount] = useState(3);

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 3);
  };

  return (
    <ListContainer>
      {/*3개 초과시 더보기 활성화 필요. */}

      {friendsList.slice(0, visibleCount).map((friend: Friends) => (
        <FriendCard
          key={friend.userId}
          profileImg={friend.profileImg}
          userName={friend.userName}
          userId={friend.userId}
        />
      ))}

      {visibleCount < friendsList.length && (
        <ShowMoreButton onClick={handleShowMore}>더보기</ShowMoreButton>
      )}
    </ListContainer>
  );
};

const FriendCard: React.FC<Friends> = ({ profileImg, userId, userName }) => {
  const deleteFriend = () => {
    //userId를 인자로 통해 넘겨 친구 삭제 로직
    confirm(`${userName}(#${userId})님을 친구목록에서 삭제할까요?`);
  };

  return (
    <Card>
      <div className={"profile-image"}>
        <Image src={profileImg} alt={"profile"} layout="fill" />
      </div>
      <div className={"user-name"}>
        {userName} (#{userId})
      </div>
      <button
        className={"delete"}
        onClick={() => {
          deleteFriend();
        }}
      >
        친구삭제
      </button>
    </Card>
  );
};

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  padding: 12px;
  width: calc(100% - 24px);

  border: 1px solid ${COLORS.greyColor};
  border-radius: 8px;
`;

const Card = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;

  width: calc(100% - 24px);
  padding: 12px;

  border-bottom: 1px solid ${COLORS.greyColor};

  & > .profile-image {
    position: relative;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
  }

  & > .user-name {
    font-size: 20px;
    line-height: 20px;
    font-weight: 900;
  }

  & > .duration {
    font-size: 14px;
    line-height: 14px;
    font-weight: 500;
  }

  & > .delete {
    all: unset;

    position: absolute;
    right: 0;
    margin-right: 12px;
    font-size: 12px;
    line-height: 12px;
    font-weight: 700;
    color: ${COLORS.redColor};

    &:hover {
      cursor: pointer;
    }
  }
`;

const ShowMoreButton = styled.button`
  all: unset;
  cursor: pointer;
  color: ${COLORS.mainColor};
  font-weight: bold;
  text-align: center;
  margin-top: 12px;
`;

export default FriendsList;
