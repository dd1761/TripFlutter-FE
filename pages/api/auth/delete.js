export default async function handler(req, res){
    if(req.method === 'POST'){
        console.log(req.body);
        const db = (await connectDB).db('forum');
        let result = await db.collection('post').deleteOne(
            { _id: new ObjectId(req.body._id) }
        );
        res.status(200).json({ message: 'Post deleted successfully', postId: req.body._id });
    }
}