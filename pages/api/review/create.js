import { connectDB } from "@/utils/database";
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { title, content, images } = req.body;
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: '인증 토큰이 필요합니다.' });
            }

            // JWT 토큰 검증
            const decoded = jwt.verify(token, process.env.JWT_SECRET || "qwer1234");
            const user_id = decoded.id;
            const author = decoded.name;

            if (!title || !content) {
                return res.status(400).json({ message: '제목과 내용이 필요합니다.' });
            }

            const db = (await connectDB).db('test');

            // postId 자동 생성 (1부터 차례로 증가)
            const latestPost = await db.collection('reviews').find().sort({ postId: -1 }).limit(1).toArray();
            const newPostId = latestPost.length > 0 ? latestPost[0].postId + 1 : 1;

            const newPost = {
                postId: newPostId,
                title,
                content,
                images: images || [],
                user_id,
                author,
                createdAt: new Date()
            };

            const result = await db.collection('reviews').insertOne(newPost);
            res.status(200).json({ message: '후기가 성공적으로 추가되었습니다.', postId: result.insertedId });
        } catch (error) {
            console.error('후기 작성 중 오류 발생:', error);
            return res.status(500).json({ message: '후기 작성에 실패했습니다.', error: error.message });
        }
    } else {
        res.status(405).json({ message: '허용되지 않은 메소드입니다.' });
    }
}