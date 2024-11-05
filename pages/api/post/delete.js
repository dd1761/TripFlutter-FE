import {ObjectId} from "bson";
import {connectDB} from "../../../utils/database";

export default async function handler(req, res){
    if(req.method === 'POST'){
        const db = (await connectDB).db('test');

        try{
            let result = await db.collection('post').deleteOne(
                { _id: new ObjectId(req.body._id) }
            );
            console.log(result);
            res.status(200).json({ message: '삭제 완료' });
        }
        catch(error){
            res.status(500).json({ error: 'Failed to delete data', message: error.message });
        }
    }
}