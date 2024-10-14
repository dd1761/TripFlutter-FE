import { connectDB } from "@/utils/database";

// 별도의 함수에서 title과 content를 매개변수로 받음
async function createPost(title, content) {
    if (!title || title.trim() === '') {
        throw new Error('제목을 입력해주세요');
    }
    if (!content || content.trim() === '') {
        throw new Error('내용을 입력해주세요');
    }

    // MongoDB 연결 및 데이터 삽입
    const db = (await connectDB).db('forum');
    let result = await db.collection('post').insertOne({ title, content, createdAt: new Date() });

    return result;
}

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { title, content } = req.body;

            // 매개변수로 createPost 호출
            let result = await createPost(title, content);

            // 리다이렉트 대신 JSON으로 응답
            return res.status(200).json({ message: 'Post created successfully', postId: result.insertedId });

        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    } else {
        return res.status(405).json({ error: '허용되지 않은 요청 메소드입니다.' });
    }
}
