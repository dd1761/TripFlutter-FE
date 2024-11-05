import axios from 'axios';
import { connectDB } from "@/utils/database";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { region } = req.body;
    if (!region) {
        return res.status(400).json({ message: 'Region parameter is required' });
    }

    const url = 'https://apis.data.go.kr/B551011/KorService1/searchKeyword1';
    const serviceKey = process.env.TOURAPI_KEY;

    try {
        // Connect to the database
        const client = await connectDB; // Await for the Promise to resolve
        const db = client.db(); // Select the default database
        const regionsCollection = db.collection('regions');
        const viewsCollection = db.collection('views');

        // Update the search count for the region
        await regionsCollection.updateOne(
            { region: region },
            { $inc: { searchCount: 1 } },
            { upsert: true }
        );

        // Get the most searched region
        const mostSearchedRegion = await regionsCollection.find().sort({ searchCount: -1 }).limit(1).toArray();
        if (mostSearchedRegion.length > 0) {
            await viewsCollection.updateOne(
                { region: mostSearchedRegion[0].region },
                { $set: { searchCount: mostSearchedRegion[0].searchCount } },
                { upsert: true }
            );
        }

        // Fetch data from the TourAPI
        const response = await axios.get(url, {
            params: {
                numOfRows: 5,
                pageNo: 1,
                MobileOS: 'ETC',
                _type: 'json',
                MobileApp: '트리플러터',
                keyword: region,
                contentTypeId: 12,
                serviceKey: serviceKey,
            },
        });

        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch data', error: error.message });
    }
}
