import { connectDB } from "@/utils/database";

export default async function friendRequestHandler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { requesterTag, recipientTag, action } = req.body;
    if (!requesterTag || !recipientTag || !action) {
        return res.status(400).json({ message: 'Requester tag, recipient tag, and action are required' });
    }

    if (!['accept', 'reject'].includes(action)) {
        return res.status(400).json({ message: 'Invalid action. Action must be either "accept" or "reject"' });
    }

    try {
        // Connect to the database
        const client = await connectDB;
        const db = client.db('test');
        const friendRequestsCollection = db.collection('friend_requests');
        const fRequestCollection = db.collection('f_request');
        const friendsTable = db.collection('friends');

        // Update the friend request status
        await friendRequestsCollection.updateOne(
            { requesterTag: requesterTag, recipientTag: recipientTag },
            { $set: { status: action } }
        );

        // Remove from f_request collection as it is handled now
        await fRequestCollection.deleteOne({ requesterTag: requesterTag, recipientTag: recipientTag });

        if (action === 'accept') {
            // Insert into friends table if the request is accepted
            await friendsTable.insertOne({
                tag: recipientTag,
                friendTag: requesterTag,
                createdAt: new Date()
            });

            await friendsTable.insertOne({
                tag: requesterTag,
                friendTag: recipientTag,
                createdAt: new Date()
            });
        }

        // Remove the friend request from the friend_requests collection
        await friendRequestsCollection.deleteOne({ requesterTag: requesterTag, recipientTag: recipientTag });

        res.status(200).json({ message: `Friend request ${action}ed successfully` });
    } catch (error) {
        res.status(500).json({ message: 'Failed to process friend request', error: error.message });
    }
}