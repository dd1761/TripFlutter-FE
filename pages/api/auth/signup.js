import bcrypt from "bcrypt";
import { connectDB } from "@/utils/database";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { email, password, name, trip_spot } = req.body;

        let db = (await connectDB).db('test');

        // 이메일 중복 검사
        const existingUser = await db.collection('user_cred').findOne({ email: email });
        if (existingUser) {
            res.status(400).json('이미 가입된 이메일입니다.');
            return;
        }

        // 현재 최대 id 값 가져오기
        const lastUser = await db.collection('user_cred').find().sort({ id: -1 }).limit(1).toArray();
        const newId = lastUser.length > 0 && lastUser[0].id ? parseInt(lastUser[0].id, 10) + 1 : 1;

        // 고유한 태그 생성 (0000부터 9999까지)
        let uniqueTag;
        let isUnique = false;
        while (!isUnique) {
            const randomTag = String(Math.floor(1000 + Math.random() * 9000)).padStart(4, '0');
            const existingTag = await db.collection('user_cred').findOne({ name_tag: `${name}#${randomTag}` });
            if (!existingTag) {
                uniqueTag = `#${randomTag}`;
                isUnique = true;
            }
        }

        // 비밀번호 암호화 후 사용자 등록
        const hash = await bcrypt.hash(password, 10);
        await db.collection('user_cred').insertOne({ id: newId, email, password: hash, name, name_tag: uniqueTag, trip_spot });

        res.status(200).json('가입성공');
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
};