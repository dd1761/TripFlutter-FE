'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ListPage() {
    const [items, setItems] = useState([]); // 초기 상태를 빈 배열로 설정
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null); // 에러 상태를 문자열 또는 null로 설정

    useEffect(() => {
        const fetchData = async () => {
            try {
                // API 호출: 서울 지역의 관광지 정보를 가져옴
                const response = await axios.get('/api/tour/tripSpot', {
                    params: {
                        region: '강원', // 기본적으로 '서울'로 설정, 사용자 입력에 따라 동적으로 변경 가능
                        page: 1
                    },
                });

                // 데이터 설정
                if (response.data) {
                    setItems(response.data);
                } else {
                    setItems([]);
                }
            } catch (err) {
                setError('Failed to fetch data'); // 오류 발생 시 에러 메시지 설정
            } finally {
                setLoading(false); // 로딩 상태 해제
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    // console.log(items);
    return (
        <div>
            {items.length > 0 ? (
                items.map((item) => (
                    <div key={item.contentid}>
                        <Link href={`/trip/detail/${encodeURIComponent(item.title)}`}>
                            {item.title}
                        </Link>
                    </div>
                ))
            ) : (
                <div>No items available</div>
            )}
        </div>
    );
}
