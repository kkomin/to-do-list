// lib/api.ts
const BASE_URL = 'https://assignment-todolist-api.vercel.app/api';

const TENANT_ID = 'kkomin';

// 항목 등록
export const addTodo = async (todo: { name: string }) => {
    try {
        const response = await fetch(`${BASE_URL}/${TENANT_ID}/items`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: todo.name }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error('API 요청 실패:', errorData);
        throw new Error(`API 요청 실패: ${response.status} - ${errorData.message}`);
    }

    const data = await response.json();
      return data; // 추가된 할 일 데이터 반환
    } catch (error) {
    console.error('API 요청 실패:', error);
    throw error;
    }
};

// 항목 조회
export const getItem = async (itemId:number) => {
    try {
        const response = await fetch(`${BASE_URL}/${TENANT_ID}/items/${itemId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    
        if (!response.ok) {
            const errorData = await response.json();
            console.error('API 요청 실패:', errorData);
            throw new Error(`API 요청 실패: ${response.status} - ${errorData.message}`);
        }
    
        const data = await response.json();
        return data; // 가져온 항목 데이터 반환
    } catch (error) {
        console.error('API 요청 실패:', error);
        throw error;
    }
};