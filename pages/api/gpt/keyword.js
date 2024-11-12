// 여행 정보 디스트럭처링 (QuickTripCreation 폼의 각 필드 매칭)
const {
  region,
  startDate,
  endDate,
  companions,
  travelStyle,
  schedulePreference,
  budget,
  duration,
} = travelInfo;

// 사용자로부터 전달받은 여행 정보 메시지로 대화 히스토리 추가
conversationHistory.push({
  role: "user",
  content: `여행 지역: ${region}, 기간: ${duration}, 여행 동반자: ${companions.join(
    ", "
  )}, 선호 스타일: ${travelStyle.join(
    ", "
  )}, 일정 선호도: ${schedulePreference}, 예산: ${budget}. 이 정보를 바탕으로 구체적인 여행 일정을 짜줘. 1일차, 13:00시 형식으로 일자별로 차근차근 작성해줘.`,
});

// OpenAI GPT-3.5 API를 사용하여 여행 정보를 바탕으로 키워드 추출 요청
const completion = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [
    { role: "system", content: "You are a helpful assistant." },
    {
      role: "user",
      content: `여행 지역: ${region}, 기간: ${duration}, 여행 동반자: ${companions.join(
        ", "
      )}, 선호 스타일: ${travelStyle.join(
        ", "
      )}, 일정 선호도: ${schedulePreference}, 예산: ${budget}. 이 정보를 바탕으로 여행의 주요 키워드를 추출해주세요.`,
    },
  ],
});

// 응답에서 키워드 추출
const keywords = completion.choices[0].message.content;
console.log(keywords);
