import { connectDB } from "@/utils/database";
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
    if (req.method === 'DELETE') {
        try {
            const { postId } = req.body;
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: 'Authentication token is required.' });
            }

            // Verify JWT token
            const decoded = jwt.verify(token, process.env.JWT_SECRET || "qwer1234");
            const user_id = decoded.id;

            if (!postId) {
                return res.status(400).json({ message: 'postId is required.' });
            }

            const db = (await connectDB).db('test');

            // Find the review to be deleted by postId and user_id
            const review = await db.collection('reviews').findOne({ postId: postId, user_id: user_id });
            if (!review) {
                return res.status(404).json({ message: 'Review not found or you do not have permission to delete it.' });
            }

            // Delete the review by postId
            await db.collection('reviews').deleteOne({ postId: postId });
            res.status(200).json({ message: 'Review deleted successfully.' });
        } catch (error) {
            console.error('Error occurred while deleting the review:', error);
            return res.status(500).json({ message: 'Failed to delete the review.', error: error.message });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed.' });
    }
}
