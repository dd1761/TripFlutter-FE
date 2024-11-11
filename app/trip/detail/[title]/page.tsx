'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface DetailData {
    title: string;
    firstimage?: string;
    overview: string;
    addr1: string;
}

export default function DetailPage() {
    const params = useParams();
    const title = params?.title;

    const [detailData, setDetailData] = useState<DetailData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!title) {
            // title이 없는 경우 아무 작업도 수행하지 않음
            return;
        }

        let decodedTitle = '';
        try {
            if (typeof title === "string") {
                decodedTitle = decodeURIComponent(title);
            }
        } catch (e) {
            console.error('Failed to decode title:', e);
            setError('Invalid title format.');
            setLoading(false);
            return;
        }

        console.log('Decoded Title:', decodedTitle); // 디버깅용 로그

        const fetchDetailData = async () => {
            try {
                const response = await axios.get('/api/tour/tripDetail', {
                    params: {
                        title: decodedTitle,
                    },
                });
                if (response.data) {
                    setDetailData(response.data);
                } else {
                    setError('Data not found.');
                }
            } catch (err) {
                console.error('Failed to fetch detail data:', err);
                setError('Failed to fetch detail data.');
            } finally {
                setLoading(false);
            }
        };

        fetchDetailData();
    }, [title]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>{detailData?.title}</h1>
            {detailData?.firstimage && (
                <img src={detailData.firstimage} alt={detailData.title} />
            )}
            <p>{detailData?.overview}</p>
            <p>{detailData?.addr1}</p>
        </div>
    );
}
