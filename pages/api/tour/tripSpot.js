import axios from 'axios';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { region } = req.query; // GET 요청이므로 쿼리로 region을 받습니다.
    const {pageNo} = req.query;
    if (!region) {
        return res.status(400).json({ message: 'Region parameter is required' });
    }

    const url = 'https://apis.data.go.kr/B551011/KorService1/searchKeyword1';
    const serviceKey = process.env.TOURAPI_KEY;

    try {
        const response = await axios.get(url, {
            params: {
                numOfRows: 20,
                pageNo: pageNo,
                MobileOS: 'ETC',
                _type: 'json',
                MobileApp: '트리플러터',
                keyword: region,
                contentTypeId: 12,
                serviceKey: serviceKey,
            },
        });

        res.status(200).json(response.data.response.body.items.item);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch data', error: error.message });
    }
}
