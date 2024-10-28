import bcrypt from "bcrypt";
import { connectDB } from "@/utils/database";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { email, password, name, trip_spot } = req.body;

        let db = (await connectDB).db('forum');

        // 이메일 중복 검사
        const existingUser = await db.collection('user_cred').findOne({ email: email });
        if (existingUser) {
            res.status(400).json('이미 가입된 이메일입니다.');
            return;
        }

        // 비밀번호 암호화 후 사용자 등록
        const hash = await bcrypt.hash(password, 10);
        await db.collection('user_cred').insertOne({ email, password: hash, name, trip_spot });

        res.status(200).json('가입성공');
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
};
