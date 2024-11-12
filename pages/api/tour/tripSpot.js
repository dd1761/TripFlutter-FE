import axios from 'axios';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { region } = req.query;
    const pageNo = req.query.pageNo || 1; // 기본값 설정

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
            headers: {
                'Cache-Control': 'no-cache' // 캐시 우회 처리
            }
        });

        res.status(200).json(response.data.response.body.items.item);
    } catch (error) {
        if (error.response) {
            res.status(error.response.status).json({ message: 'Failed to fetch data', error: error.response.data });
        } else {
            res.status(500).json({ message: 'Failed to fetch data', error: error.message });
        }
    }
}
