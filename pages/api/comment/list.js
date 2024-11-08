import { connectDB } from "@/utils/database";

export default async function handler(req, res) {
    if(req.method === 'POST'){
        const { post_id } = req.body;

        if (!post_id) {
            return res.status(400).json({ message: 'post_id가 필요합니다.' });
        }

        try {
            const db = (await connectDB).db('test');

            let result = await db.collection('comments').find({
                postId: post_id
            }).toArray();

            if (result.length === 0) {
                return res.status(404).json({ message: '댓글을 찾을 수 없습니다.' });
            }

            res.status(200).json(result);
        } catch (error) {
            console.error('댓글 조회 중 오류 발생:', error);
            return res.status(500).json({ message: '댓글 조회에 실패했습니다.', error: error.message });
        }
    } else {
        res.status(405).json({ message: '허용되지 않은 메소드입니다.' });
    }
}
