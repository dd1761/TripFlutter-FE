"use client";
import DefaultLayout from "@/app/components/DefaultLayout";
import CommonHeader from "@/app/components/commons/CommonHeader";
import QuickTripCreation from "@/app/components/commons/QuickTripCreation";

const QuickCreateTripPage: React.FC = () => {
  return (
    <DefaultLayout top={0} right={0} bottom={0} left={0} nav={true}>
      <CommonHeader backLink={"/"} headerTitle={"간편 여정 생성 페이지"} />
      <QuickTripCreation />
    </DefaultLayout>
  );
};

export default QuickCreateTripPage;
