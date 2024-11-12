import { connectDB } from "@/utils/database";
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
    if (req.method === 'PUT') {
        try {
            const { postId, title, content, images } = req.body;
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: 'Authentication token is required.' });
            }

            // Verify JWT token
            const decoded = jwt.verify(token, process.env.JWT_SECRET || "qwer1234");
            const user_id = decoded.id;

            if (!postId || !title || !content) {
                return res.status(400).json({ message: 'postId, title, and content are required.' });
            }

            const db = (await connectDB).db('test');

            // Update the review
            const result = await db.collection('reviews').updateOne(
                { postId: postId, user_id: user_id },
                { $set: { title: title, content: content, images: images || [] } }
            );

            if (result.matchedCount === 0) {
                return res.status(404).json({ message: 'Review not found or you do not have permission to update it.' });
            }

            res.status(200).json({ message: 'Review updated successfully.' });
        } catch (error) {
            console.error('Error occurred while updating the review:', error);
            return res.status(500).json({ message: 'Failed to update the review.', error: error.message });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed.' });
    }
}