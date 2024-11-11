import { connectDB } from "@/utils/database";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const db = (await connectDB).db('test');

            // Fetch all reviews
            const reviews = await db.collection('reviews').find({}).toArray();
            res.status(200).json(reviews);
        } catch (error) {
            console.error('Error occurred while fetching the reviews:', error);
            return res.status(500).json({ message: 'Failed to fetch reviews.', error: error.message });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed.' });
    }
}
