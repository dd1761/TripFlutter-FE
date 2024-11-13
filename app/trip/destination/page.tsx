"use client";

import DefaultLayout from "@/app/components/DefaultLayout";
import CommonHeader from "@/app/components/commons/CommonHeader";
import TouristSpots from "@/app/components/commons/TouristSpots";

// DestinationTripPage 컴포넌트
const DestinationTripPage: React.FC = () => {
  const region = "서울"; // Here, you define the region (you can make this dynamic if needed)

  return (
    <DefaultLayout top={0} right={0} bottom={0} left={0} nav={true}>
      <CommonHeader backLink={"/"} headerTitle={"여행지 리스트 페이지"} />
      <TouristSpots region="서울" pageNo={1} />
    </DefaultLayout>
  );
};

export default DestinationTripPage;
