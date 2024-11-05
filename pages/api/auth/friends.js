import { connectDB } from "@/utils/database";

export default async function friendRequestHandler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { requesterEmail, recipientEmail } = req.body;
    if (!requesterEmail || !recipientEmail) {
        return res.status(400).json({ message: 'Both requester and recipient emails are required' });
    }

    try {
        // Connect to the database
        const db = await connectDB();
        const friendsCollection = db.collection('friend_requests');

        // Insert friend request document
        await friendsCollection.insertOne({
            requesterEmail: requesterEmail,
            recipientEmail: recipientEmail,
            status: 'pending',
            createdAt: new Date()
        });

        res.status(200).json({ message: 'Friend request sent successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to send friend request', error: error.message });
    }
}
