import axios from 'axios';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    let { region } = req.query;
    if (!region) {
        return res.status(400).json({ message: 'Region parameter is required' });
    }

    if(region === '서울') {
        region = 1;
    }
    if(region === '인천') {
        region = 2;
    }
    if(region === '대전') {
        region = 3;
    }
    if(region === '대구') {
        region = 4;
    }
    if(region === '광주') {
        region = 5;
    }
    if(region === '부산') {
        region = 6;
    }
    if(region === '울산') {
        region = 7;
    }
    if(region === '세종') {
        region = 8;
    }
    if(region === '경기') {
        region = 31;
    }
    if(region === '강원') {
        region = 32;
    }
    if(region === '충북') {
        region = 33;
    }
    if(region === '충남') {
        region = 34;
    }
    if(region === '경북') {
        region = 35;
    }
    if(region === '경남') {
        region = 36;
    }
    if(region === '전북') {
        region = 37;
    }
    if(region === '전남') {
        region = 38;
    }
    if(region === '제주') {
        region = 39;
    }

    const url = 'https://apis.data.go.kr/B551011/KorService1/searchStay1';
    const serviceKey = process.env.TOURAPI_KEY;

    try {
        const response = await axios.get(url, {
            params: {
                numOfRows: 5,
                pageNo: 1,
                MobileOS: 'ETC',
                MobileApp: '트리플러터',
                _type: 'json',
                areaCode: region,
                serviceKey: serviceKey,
            },
        });

        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch data', error: error.message });
    }
}
