import axios from 'axios';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { region, title } = req.query;

    if (!region && !title) {
        return res.status(400).json({ message: 'Either Region or Title parameter is required' });
    }

    const url = 'https://apis.data.go.kr/B551011/KorService1/searchKeyword1';
    const serviceKey = process.env.TOURAPI_KEY;

    try {
        const response = await axios.get(url, {
            params: {
                numOfRows: 1, // 1개의 항목만 필요
                pageNo: 1,
                MobileOS: 'ETC',
                _type: 'json',
                MobileApp: '트리플러터',
                keyword: title || region,
                contentTypeId: 12,
                serviceKey: serviceKey,
            },
        });

        const items = response.data.response.body.items.item;

        if (!items || items.length === 0) {
            return res.status(404).json({ message: 'No data found' }); // 데이터가 없을 때 처리
        }

        res.status(200).json(items[0]); // 단일 항목 반환
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch data', error: error.message });
    }
}
