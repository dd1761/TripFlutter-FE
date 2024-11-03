import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // 환경 변수로 API 키 설정
});

// 대화 히스토리 관리 (이전 메시지 저장)
let conversationHistory = [
    { role: "system", content: "You are a helpful assistant." }
];

export default async function handler(req, res) {
    const { travelInfo } = req.body; // 여행 관련 정보

    // 여행 관련 정보 추출
    const { region, gender, peopleCount, budget, purpose, duration } = travelInfo;

    // 여행 정보를 대화 히스토리에 추가
    conversationHistory.push({
        role: "user",
        content: `여행 지역: ${region}, 성별: ${gender}, 사람 수: ${peopleCount}, 예산: ${budget}, 목적: ${purpose}, 기간: ${duration}. 해당 여행지 여행 계획 구체적으로 시간 별로 계획을 추천해줘.`
    });


    try {
        // OpenAI API 호출
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: conversationHistory, // 전체 대화 히스토리 포함
        });

        // 어시스턴트의 응답 추출
        const assistantMessage = completion.choices[0].message.content;

        // 대화 히스토리에 어시스턴트의 응답 추가
        conversationHistory.push({ role: "assistant", content: assistantMessage });

        // 응답 전송
        res.status(200).json({
            assistantMessage: assistantMessage, // 어시스턴트의 새 응답
        });
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({ error: 'Failed to communicate with GPT.' });
    }
}
