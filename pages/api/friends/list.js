import { connectDB } from "@/utils/database";

export default async function friendListHandler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { email: userEmail } = req.body;
    if (!userEmail) {
        return res.status(400).json({ message: 'User email is required' });
    }

    try {
        // Connect to the database
        const client = await connectDB;
        const db = client.db();
        const friendsTable = db.collection('friends');

        // Fetch friends list for the given user
        const friends = await friendsTable.find({ email: userEmail }).toArray();

        res.status(200).json({ friends });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch friend list', error: error.message });
    }
}
