import { connectDB } from "@/utils/database";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            // MongoDB 연결 및 데이터 조회
            const db = (await connectDB).db('forum');
            let result = await db.collection('post').find().toArray();

            // 데이터를 JSON 형태로 반환
            res.status(200).json(result);
        } catch (error) {
            // 에러 처리: 에러 메시지 포함
            res.status(500).json({ error: 'Failed to fetch data', message: error.message });
        }
    } else {
        // GET 메소드가 아닌 경우 처리
        res.status(405).json({ error: 'Method not allowed' });
    }
}
