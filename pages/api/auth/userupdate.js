import { connectDB } from "@/utils/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const db = (await connectDB).db('forum');

        try {
            // 업데이트할 데이터 (이름, 이메일, 이미지 등을 포함할 수 있음)
            const updateFields = {};
            if (req.body.name) updateFields.name = req.body.name;
            if (req.body.email) updateFields.email = req.body.email;
            if (req.body.image) updateFields.image = req.body.image;

            // MongoDB 업데이트
            let result = await db.collection('user_cred').updateOne(
                { _id: new ObjectId(req.body._id) }, // 고유한 ID로 사용자를 식별
                { $set: updateFields } // 업데이트할 필드 설정
            );

            if (result.modifiedCount === 0) {
                res.status(404).json({ message: '해당 사용자 정보를 찾을 수 없습니다.' });
                return;
            }

            console.log(result);
            res.status(200).json({ message: '회원 정보 수정 완료' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to update user information', message: error.message });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
