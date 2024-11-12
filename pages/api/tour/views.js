import { connectDB } from "@/utils/database";

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        let db = (await connectDB).db('test');
        console.log('Fetching posts from the database sorted by views...');
        const posts = await db.collection('views').find().sort({ views: -1 }).toArray();
        res.status(200).json(posts);
    } catch (dbError) {
        console.error('Error fetching posts from DB:', dbError);
        return res.status(500).json({ message: 'Failed to fetch posts from DB', error: dbError.message });
    }
}
