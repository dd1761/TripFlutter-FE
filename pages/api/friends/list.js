import { connectDB } from "@/utils/database";
import jwt from 'jsonwebtoken';

export default async function friendListHandler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Authentication token is required' });
    }

    try {
        // Verify JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "qwer1234");
        const { email } = decoded;

        if (!email) {
            return res.status(400).json({ message: 'User email is required' });
        }

        // Connect to the database
        const client = await connectDB;
        const db = client.db('test');
        const friendsTable = db.collection('friends');

        // Fetch friends list for the given user email
        const friends = await friendsTable.find({ email: email }).toArray();

        res.status(200).json({ friends });
    } catch (error) {
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }
        res.status(500).json({ message: 'Failed to fetch friend list', error: error.message });
    }
}