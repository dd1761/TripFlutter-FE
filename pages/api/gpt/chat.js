import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // 환경 변수로 API 키 설정
});

// 대화 히스토리 관리 (이전 메시지 저장)
let conversationHistory = [
    { role: "system", content: "You are a helpful assistant." }
];

export default async function handler(req, res) {
    const { userMessage } = req.body; // 사용자의 새 메시지

    // 사용자 메시지를 히스토리에 추가
    conversationHistory.push({ role: "user", content: userMessage });

    try {
        // OpenAI API 호출
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: conversationHistory, // 전체 대화 히스토리 포함
        });

        const assistantMessage = completion.choices[0].message.content;

        // 어시스턴트의 응답을 히스토리에 추가
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
