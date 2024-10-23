"use client";
import styled from "styled-components";
import DefaultLayout from "../components/DefaultLayout";
import { COLORS } from "@/public/styles/colors";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

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
      {/*로그인 상태에 따른 분기 */}
      {user.isLogin ? <></> : <></>}
    </DefaultLayout>
  );
};

export default MyPageIntroPage;
