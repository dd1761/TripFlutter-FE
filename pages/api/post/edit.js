import { connectDB } from "@/utils/database";
import {ObjectId} from "mongodb";

export default async function handler(req, res) {
    if(req.method === 'POST'){
        console.log(req.body);

        let request = {
            title: req.title,
            content: req.content
        }

        const db = (await connectDB).db('forum');
        let result = await db.collection('post').updateOne(
            {_id: new ObjectId(req.body._id) },
            { $set: request }
    );
            res.status(200).json({ message: 'Post updated successfully', postId: req.body._id });
    }
}