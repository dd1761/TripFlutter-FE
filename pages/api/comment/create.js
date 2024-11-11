import { connectDB } from "@/utils/database";
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { postId, commentContent } = req.body;

        if (!postId || !commentContent) {
            return res.status(400).json({ message: 'postId와 commentContent가 필요합니다.' });
        }

        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: '인증 토큰이 필요합니다.' });
        }

        try {
            // 환경 변수를 사용하지 않고 비밀 키를 직접 전달
            const secretKey = "qwer1234";  // 직접 정의한 비밀 키
            const decoded = jwt.verify(token, secretKey);
            console.log('Decoded token:', decoded);
            const email = decoded.email;
            const name = decoded.name;
            const user_id = decoded.id;

            let db = (await connectDB).db('test');

            // 현재 최대 commentId를 찾고, 1을 증가시켜 새로운 commentId 생성
            const latestComment = await db.collection('comments').find().sort({ commentId: -1 }).limit(1).toArray();
            const newCommentId = latestComment.length > 0 && latestComment[0].commentId ? latestComment[0].commentId + 1 : 1;

            console.log('Inserting a new comment into the database...');
            const newComment = {
                postId: postId,
                email: email,
                name: name,
                user_id: user_id,
                commentContent: commentContent,
                commentId: newCommentId,
                createdAt: new Date()
            };

            const result = await db.collection('comments').insertOne(newComment);
            console.log('Comment inserted successfully');

            res.status(200).json({ message: '댓글이 성공적으로 추가되었습니다.', commentId: result.insertedId, token: decoded })
        } catch (error) {
            console.error('토큰 검증 또는 댓글 저장 중 오류 발생:', error);
            return res.status(500).json({ message: '댓글 저장에 실패했거나 유효하지 않은 토큰입니다.', error: error.message });
        }
    } else {
        res.status(405).json({ message: '허용되지 않은 메소드입니다.' });
    }
}