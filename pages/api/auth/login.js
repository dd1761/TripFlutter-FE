import bcrypt from "bcrypt";
import { connectDB } from "@/utils/database";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const { email, password } = req.body;

            // DB 연결 및 유저 확인
            let db = (await connectDB).db('test');
            let user = await db.collection('user_cred').findOne({ email });

            if (!user) {
                return res.status(401).json("이메일 또는 비밀번호가 잘못되었습니다.");
            }

            // 비밀번호 확인
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                return res.status(401).json("이메일 또는 비밀번호가 잘못되었습니다.");
            }

            // JWT 토큰 생성
            const token = jwt.sign(
                { id: user._id, email: user.email, name: user.name },
                "qwer1234",
                { expiresIn: "30d" }
            );

            // 로그인 성공 응답
            res.status(200).json({ message: "로그인 성공", token });
        } catch (error) {
            console.error("Error during login:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}