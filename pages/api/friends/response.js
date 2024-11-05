import { connectDB } from "@/utils/database";

export default async function friendResponseHandler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { recipientEmail, requesterEmail, action } = req.body;
    if (!recipientEmail || !requesterEmail || !action) {
        return res.status(400).json({ message: 'Recipient email, requester email, and action are required' });
    }

    if (!['accept', 'reject'].includes(action)) {
        return res.status(400).json({ message: 'Invalid action. Action must be either "accept" or "reject"' });
    }

    try {
        // Connect to the database
        const client = await connectDB;
        const db = client.db();
        const friendRequestsCollection = db.collection('friend_requests');
        const fRequestCollection = db.collection('f_request');
        const friendsTable = db.collection('friends');

        // Update the friend request status
        await friendRequestsCollection.updateOne(
            { requesterEmail: requesterEmail, recipientEmail: recipientEmail },
            { $set: { status: action } }
        );

        // Remove from f_request collection as it is handled now
        await fRequestCollection.deleteOne({ requesterEmail: requesterEmail, recipientEmail: recipientEmail });

        if (action === 'accept') {
            // Insert into friends table if the request is accepted
            await friendsTable.insertOne({
                email: recipientEmail,
                friendEmail: requesterEmail,
                createdAt: new Date()
            });

            await friendsTable.insertOne({
                email: requesterEmail,
                friendEmail: recipientEmail,
                createdAt: new Date()
            });
        }

        // Remove the friend request from the friend_requests collection
        await friendRequestsCollection.deleteOne({ requesterEmail: requesterEmail, recipientEmail: recipientEmail });

        res.status(200).json({ message: `Friend request ${action}ed successfully` });
    } catch (error) {
        res.status(500).json({ message: 'Failed to process friend request', error: error.message });
    }
}