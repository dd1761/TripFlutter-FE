import { connectDB } from "@/utils/database";

export default async function friendRequestHandler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { requesterEmail, recipientEmail } = req.body;
    if (!requesterEmail || !recipientEmail) {
        return res.status(400).json({ message: 'Requester and recipient emails are required' });
    }

    try {
        // Connect to the database
        const client = await connectDB;
        const db = client.db();
        const usersCollection = db.collection('user_cred');
        const friendRequestsCollection = db.collection('friend_requests');
        const fRequestCollection = db.collection('f_request');

        // Check if both requester and recipient emails exist in the users collection
        const requesterExists = await usersCollection.findOne({ email: requesterEmail });
        const recipientExists = await usersCollection.findOne({ email: recipientEmail });

        if (!requesterExists || !recipientExists) {
            return res.status(400).json({ message: '이메일이 존재하지 않습니다.' });
        }

        // Insert friend request document
        await friendRequestsCollection.insertOne({
            requesterEmail: requesterEmail,
            recipientEmail: recipientEmail,
            status: 'pending',
            createdAt: new Date()
        });

        // Insert into f_request table to allow the recipient to see the friend request
        await fRequestCollection.insertOne({
            requesterEmail: requesterEmail,
            recipientEmail: recipientEmail,
            status: 'pending',
            createdAt: new Date()
        });

        res.status(200).json({ message: 'Friend request sent successfully and added to f_request table' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to send friend request', error: error.message });
    }
}
