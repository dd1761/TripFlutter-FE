import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // 환경 변수로 API 키 설정
});

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { message } = req.body;

            if (!message) {
                res.status(400).json({ error: 'Missing message in request body.' });
                return;
            }

            // OpenAI API 호출하여 키워드 추출 요청
            const completion = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: "You are a helpful assistant." },
                    { role: "user", content: `Extract location-related keywords from each day of this message: "${message}" and organize them by day (e.g., 1일차, 2일차, etc.). Provide a JSON object with each day as a key.` }
                ],
            });

            // 어시스턴트의 응답 추출
            let assistantMessage = completion.choices[0].message.content.trim();

            // 코드 블록 제거 및 JSON 문자열만 추출
            if (assistantMessage.startsWith("```json")) {
                assistantMessage = assistantMessage.replace(/```json|```/g, "").trim();
            }

            // JSON 형식으로 변환
            const keywordsByDay = JSON.parse(assistantMessage);

            // 응답 전송
            res.status(200).json({
                keywordsByDay: keywordsByDay // 추출된 키워드 리스트
            });
        } catch (error) {
            console.error("Error occurred:", error);
            res.status(500).json({ error: 'Failed to process the request.', details: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
