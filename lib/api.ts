// lib/api.ts
const BASE_URL = 'https://assignment-todolist-api.vercel.app/api';

export const addTodo = async (tenantId: string, todo: { name: string }) => {
    try {
        const response = await fetch(`${BASE_URL}/${tenantId}/items`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: todo.name }), // 'name'만 포함
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
