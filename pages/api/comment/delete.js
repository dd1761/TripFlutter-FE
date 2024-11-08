import { connectDB } from "@/utils/database";
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
    if (req.method === 'DELETE') {
        const { commentId } = req.body;

        if (!commentId) {
            return res.status(400).json({ message: '리뷰 ID가 필요합니다.' });
        }

        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: '인증 토큰이 필요합니다.' });
        }

        try {
            const secretKey = process.env.JWT_SECRET || "qwer1234";
            const decoded = jwt.verify(token, secretKey);
            const userId = decoded.id;

            let db = (await connectDB).db('test');

            console.log('데이터베이스에서 리뷰 삭제 시도 중...');
            const comment = await db.collection('comments').findOne({ commentId: commentId });

            if (!comment) {
                return res.status(404).json({ message: '리뷰를 찾을 수 없습니다.' });
            }

            if (comment.user_id !== userId) {
                return res.status(403).json({ message: '이 리뷰를 삭제할 권한이 없습니다.' });
            }

            await db.collection('comments').deleteOne({ commentId: commentId });
            console.log('리뷰 삭제 완료');

            res.status(200).json({ message: '리뷰가 성공적으로 삭제되었습니다.' });
        } catch (error) {
            console.error('토큰 검증 또는 리뷰 삭제 중 오류 발생:', error);
            return res.status(500).json({ message: '리뷰 삭제에 실패했거나 유효하지 않은 토큰입니다.', error: error.message });
        }
    } else {
        res.status(405).json({ message: '허용되지 않은 메소드입니다.' });
    }
}
