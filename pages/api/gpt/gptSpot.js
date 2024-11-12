import OpenAI from "openai";
import axios from "axios";

// OpenAI 객체 생성, 환경 변수로 API 키를 설정
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 대화 히스토리 관리 (이전 메시지 저장)
let conversationHistory = [
  { role: "system", content: "You are a helpful assistant." },
];

// API 핸들러 함수
export default async function handler(req, res) {
  // POST 요청만 처리
  if (req.method === "POST") {
    // 클라이언트에서 전달된 여행 정보 추출
    const { travelInfo } = req.body;

    // 여행 정보가 없을 경우 에러 반환
    if (!travelInfo) {
      res.status(400).json({ error: "Request body에 travelInfo가 없습니다." });
      return;
    }

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

    try {
      // OpenAI API 호출, 전체 대화 히스토리 전달
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: conversationHistory,
      });

      // 어시스턴트의 응답 추출
      const assistantMessage = completion.choices[0].message.content;

      // 대화 히스토리에 어시스턴트의 응답 추가
      conversationHistory.push({
        role: "assistant",
        content: assistantMessage,
      });

      // 클라이언트에 어시스턴트의 응답 전송
      res.status(200).json({
        assistantMessage: assistantMessage, // 어시스턴트의 응답
      });
    } catch (error) {
      console.error("Error occurred:", error);
      res.status(500).json({ error: "요청 처리에 실패했습니다." });
    }
  } else {
    // 허용되지 않은 메서드의 경우
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
