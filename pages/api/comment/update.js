import { connectDB } from "@/utils/database";
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
    if(req.method === 'POST'){
        try {
            const { commentId, content } = req.body;
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: '인증 토큰이 필요합니다.' });
            }
            const decoded = jwt.verify(token, "qwer1234");
            const user_id = decoded.id;

            if (!commentId) {
                return res.status(400).json({ message: 'commentId가 필요합니다.' });
            }

            if (!content) {
                return res.status(400).json({ message: 'content가 필요합니다.' });
            }

            const db = (await connectDB).db('test');

            let result = await db.collection('comments').updateOne(
                { commentId: commentId, user_id: user_id },
                { $set: { commentContent: content } }
            );

            if (result.matchedCount === 0) {
                return res.status(404).json({ message: '댓글을 찾을 수 없거나 권한이 없습니다.' });
            }

            res.status(200).json({ message: '댓글이 성공적으로 수정되었습니다.', commentId: commentId });
        } catch (error) {
            console.error('댓글 수정 중 오류 발생:', error);
            return res.status(500).json({ message: '댓글 수정에 실패했습니다.', error: error.message });
        }
    } else {
        res.status(405).json({ message: '허용되지 않은 메소드입니다.' });
    }
}
