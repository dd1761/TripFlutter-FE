"use client";
import DefaultLayout from "@/app/components/DefaultLayout";
import CommonHeader from "@/app/components/commons/CommonHeader";
import Chat from "@/app/components/commons/Chat";

const CreateTripPage: React.FC = () => {
  return (
    <DefaultLayout top={0} right={0} bottom={0} left={0} nav={true}>
      <CommonHeader backLink={"/"} headerTitle={"채팅 여정 생성 페이지"} />
      <Chat />
    </DefaultLayout>
  );
};

export default CreateTripPage;
