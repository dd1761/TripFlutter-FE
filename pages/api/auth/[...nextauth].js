import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { connectDB } from "@/utils/database";
import { getAuth, GoogleAuthProvider } from "@firebase/auth";

export const authOptions = {
    providers: [
        GithubProvider({
            clientId: 'Ov23liKjkBXd5MKGYum8',
            clientSecret: 'd64f053cb25c45c9a44181ba34cbc86a9e6c4192',
        }),

        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "password", type: "password" },
            },

            async authorize(credentials) {
                let db = (await connectDB).db('forum');
                let user = await db.collection('user_cred').findOne({ email: credentials.email });
                if (!user) {
                    console.log('해당 이메일은 없음');
                    return null;
                }
                const pwcheck = await bcrypt.compare(credentials.password, user.password);
                if (!pwcheck) {
                    console.log('비번틀림');
                    return null;
                }
                return user;
            }
        })
    ],
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60 // 30일
    },

    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.user = {
                    name: user.name,
                    email: user.email
                };
            }
            return token;
        },
        session: async ({ session, token }) => {
            session.user = token.user;
            return session;
        },
        signIn: async ({ user, account, profile }) => {
            if (account.provider === 'github') {
                // GitHub 로그인 시 user_cred 컬렉션에 저장
                try {
                    let db = (await connectDB).db('forum');
                    let existingUser = await db.collection('user_cred').findOne({ email: user.email });

                    if (!existingUser) {
                        // GitHub 프로필 정보를 user_cred 컬렉션에 추가
                        await db.collection('user_cred').insertOne({
                            name: user.name,
                            email: user.email,
                            image: user.image,
                            password: null // GitHub 로그인 사용자는 비밀번호가 없기 때문에 null로 설정
                        });
                    }
                } catch (error) {
                    console.error('Error saving GitHub user to DB:', error);
                    return false; // 로그인 실패
                }
            }
            return true; // 로그인 성공
        }
    },

    adapter: MongoDBAdapter(connectDB),
    secret: 'qwer1234'
};

export default NextAuth(authOptions);
