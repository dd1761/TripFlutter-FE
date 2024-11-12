import axios from 'axios';
import { connectDB } from "@/utils/database";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { keywordsByDay } = req.body;

    if (!keywordsByDay) {
        return res.status(400).json({ message: 'keywordsByDay parameter is required' });
    }

    const url = 'https://apis.data.go.kr/B551011/KorService1/searchKeyword1';
    const serviceKey = process.env.TOURAPI_KEY;

    let results = [];

    try {
        for (const [day, keywords] of Object.entries(keywordsByDay)) {
            for (const keyword of keywords) {
                try {
                    const response = await axios.get(url, {
                        params: {
                            numOfRows: 1, // 1개의 항목만 필요
                            pageNo: 1,
                            MobileOS: 'ETC',
                            _type: 'json',
                            MobileApp: '트리플러터',
                            keyword: keyword,
                            contentTypeId: 12,
                            serviceKey: serviceKey,
                        },
                    });

                    const items = response.data.response.body.items.item;

                    if (items && items.length > 0) {
                        const item = items[0];
                        console.log(`Data fetched successfully for keyword: ${keyword}`, item);

                        let db = (await connectDB).db('test');

                        // Get the current max postid and increment it by 1
                        const currentMaxPostIdDoc = await db.collection('views').find().sort({ postid: -1 }).limit(1).toArray();
                        const currentMaxPostId = currentMaxPostIdDoc.length > 0 ? currentMaxPostIdDoc[0].postid : 0;
                        const newPostId = currentMaxPostId + 1;

                        const filter = { title: item.title };
                        const update = {
                            $inc: { views: 1 },
                            $setOnInsert: {
                                postid: newPostId, // Incremental postid
                                title: item.title,
                                firstimage: item.firstimage,
                                createdAt: new Date()
                            }
                        };
                        const options = { upsert: true, returnDocument: 'after' };

                        const updatedDocument = await db.collection('views').findOneAndUpdate(filter, update, options);
                        const updatedViews = updatedDocument.value ? updatedDocument.value.views : 1;
                        console.log('Title, views, and firstimage updated or inserted successfully');

                        results.push({
                            day: day,
                            title: item.title,
                            views: updatedViews,
                            firstimage: item.firstimage,
                            overview: item.overview
                        });
                    } else {
                        console.log(`No data found for keyword: ${keyword}`);
                    }
                } catch (error) {
                    console.error(`Error fetching data for keyword: ${keyword}`, error);
                }
            }
        }

        res.status(200).json({ results });
    } catch (error) {
        console.error('Error processing keywords:', error);
        res.status(500).json({ message: 'Failed to process keywords', error: error.message });
    }
}