export default function handler(req, res){
    if(req.method == 'POST'){
        return res.status(200).json('처리 완료');
    }

}